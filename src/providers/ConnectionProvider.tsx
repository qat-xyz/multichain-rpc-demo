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
  const [isConnected, setValue] = useLocalStorage("IS_CONNECTED", false);

  const [connectionState, connectOrDisconnect] = useAsyncFn(async isConnect =>
    isConnect
      ? quantum.request({
          method: "eth_requestAccounts",
        })
      : false,
  );

  useEffect(() => {
    const onAccountChanged = () => {
      void connectOrDisconnect(isConnected);
    };
    quantum.on("accountsChanged", onAccountChanged);
    return () => quantum.off("accountsChanged", onAccountChanged);
  }, [connectOrDisconnect, isConnected, quantum]);

  // save the connection state for eager connection
  useEffect(() => {
    if (connectionState.value) {
      setValue(true);
    } else {
      setValue(false);
    }
  }, [connectionState, setValue]);

  // eager connection
  useEffect(() => {
    if (isConnected) {
      void connectOrDisconnect(true);
    }
  }, [isConnected, connectOrDisconnect]);

  return (
    <ConnectionContext.Provider
      value={{
        connect: () => connectOrDisconnect(true),
        disconnect: () => connectOrDisconnect(false),
        isConnected: !!isConnected,
        account: connectionState.value?.[0],
        error: connectionState.error,
        loading: connectionState.loading,
        quantum,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext);
