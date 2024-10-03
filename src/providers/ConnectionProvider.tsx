import { useToast } from "@chakra-ui/react";
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useAsync, useAsyncFn, useLocalStorage } from "react-use";

import { QuantumAccount } from "../types/QuantumAccount";
import { QuantumAccountNetwork } from "../types/QuantumAccountNetwork";

const ConnectionContext = createContext<{
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  loading: boolean;
  quantum?: any;
  error?: Error;
  account?: string;
  quantumAccount?: QuantumAccount;
  quantumAccountNetworks?: QuantumAccountNetwork[];
}>({
  connect: () => {},
  disconnect: () => {},
  isConnected: false,
  loading: false,
});

export const ConnectionProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const toast = useToast();
  const quantum: any = useMemo(() => {
    if ("quantum" in window) {
      const quantum = window.quantum as any;
      return quantum.ethereum;
    } else {
      return undefined;
    }
  }, []);
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

  const quantumAccount = useAsync(async () => {
    if (account) {
      return await quantum.request({
        method: "quantum_getAccount",
      });
    }
  }, [account]);

  const quantumAccountNetworks = useAsync(async () => {
    if (account) {
      return await quantum.request({
        method: "quantum_getAccountNetworks",
      });
    }
  }, [account]);

  useEffect(() => {
    if (connectionState.error) {
      toast({
        title: connectionState.error.name ?? "Connection Failed!",
        description: (connectionState.error as Error)?.message,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [connectionState.error, toast]);

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
        error: connectionState.error ?? quantumAccount.error ?? quantumAccountNetworks.error,
        loading:
          connectionState.loading || quantumAccount.loading || quantumAccountNetworks.loading,
        quantumAccount: quantumAccount.value,
        quantumAccountNetworks: quantumAccountNetworks.value,
        account,
        quantum,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext);
