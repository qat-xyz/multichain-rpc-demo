import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useAsyncFn, useLocalStorage } from "react-use";

const ConnectionContext = createContext<{
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  loading: boolean;
  quantum?: any;
  error?: Error;
  account?: string;
}>({
  connect: () => {},
  disconnect: () => {},
  isConnected: false,
  loading: false,
});

export const ConnectionProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const quantum: any = useMemo(() => ("quantum" in window ? window.quantum : undefined), []);
  const [isConnected, setIsConnected] = useLocalStorage("IS_CONNECTED", false);

  const [connectionState, connectOrDisconnect] = useAsyncFn(
    async isConnect =>
      isConnect
        ? await quantum.request({
            method: "eth_requestAccounts",
          })
        : [],
    [quantum],
  );

  const account = connectionState.value?.[0];

  useEffect(() => {
    const onAccountChanged = (accounts: string[]) => {
      if (accounts?.[0] !== account) {
        void connectOrDisconnect(!!accounts?.[0]);
      }
    };
    quantum?.on("accountsChanged", onAccountChanged);
    return () => quantum?.off("accountsChanged", onAccountChanged);
  }, [account, connectOrDisconnect, connectionState.value, quantum]);

  // save the connection state for eager connection
  useEffect(() => {
    if (account) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [account, setIsConnected]);

  // eager connection
  useEffect(() => {
    if (isConnected) {
      void connectOrDisconnect(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConnectionContext.Provider
      value={{
        connect: () => connectOrDisconnect(true),
        disconnect: () => connectOrDisconnect(false),
        isConnected: !!account,
        error: connectionState.error,
        loading: connectionState.loading,
        account,
        quantum,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext);
