import { useToast } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
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
      return window.quantum as any;
    } else {
      return undefined;
    }
  }, []);

  const [isConnected, setIsConnected] = useLocalStorage("IS_CONNECTED", false);

  const [connectionState, connectOrDisconnect] = useAsyncFn(
    async isConnect => {
      const errors = [];
      const addresses = {
        EVM: "",
        SVM: "",
      };
      if (quantum && isConnect) {
        try {
          const ethAddress = await quantum.ethereum.request({
            method: "eth_requestAccounts",
          });
          addresses.EVM = ethAddress[0];
        } catch (e) {
          errors.push(e);
        }
        try {
          const svmAddress: { publicKey: PublicKey } = await quantum.solana.connect();
          addresses.SVM = svmAddress.publicKey.toBase58();
        } catch (e) {
          errors.push(e);
        }
        if (!addresses.EVM && !addresses.SVM)
          throw new Error("Connection Failed!\n" + errors.map((e: any) => e.message).join("\n"));
      }
      return addresses;
    },
    [quantum],
  );

  const quantumAccount = useAsync(async () => {
    if (quantum && connectionState.value) {
      if (connectionState.value.EVM) {
        try {
          const accountInfo = await quantum.ethereum.request({
            method: "quantum_getAccount",
          });
          return {
            ...accountInfo,
            addresses: connectionState.value,
          };
        } catch {}
      }
      if (connectionState.value.SVM) {
        try {
          const accountInfo = await quantum.solana.request({
            method: "quantum_getAccount",
          });
          return {
            ...accountInfo,
            addresses: connectionState.value,
          };
        } catch {}
      }
      return;
    }
  }, [connectionState.value, quantum]);

  const quantumAccountNetworks = useAsync(async () => {
    const networks = [];
    if (quantum && connectionState.value) {
      if (connectionState.value.EVM) {
        try {
          const evmNetworks = await quantum.ethereum.request({
            method: "quantum_getAccountNetworks",
          });
          networks.push(...evmNetworks);
        } catch {}
      }
      if (connectionState.value.SVM) {
        try {
          const svmNetworks = await quantum.solana.request({
            method: "quantum_getAccountNetworks",
          });
          networks.push(...svmNetworks);
        } catch {}
      }
    }
    return networks;
  }, [connectionState.value, quantum]);

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
      if (isConnected && accounts?.[0] !== connectionState.value?.EVM) {
        void connectOrDisconnect(true);
      }
    };
    quantum?.ethereum.on("accountsChanged", onAccountChanged);
    return () => quantum?.ethereum.off("accountsChanged", onAccountChanged);
  }, [connectOrDisconnect, connectionState.value, isConnected, quantum]);

  useEffect(() => {
    const onAccountChanged = (account: PublicKey) => {
      if (isConnected && account?.toBase58() !== connectionState.value?.SVM) {
        void connectOrDisconnect(true);
      }
    };
    quantum?.solana.on("accountChanged", onAccountChanged);
    return () => quantum?.solana.off("accountChanged", onAccountChanged);
  }, [connectOrDisconnect, connectionState.value, isConnected, quantum]);

  // save the connection state for eager connection
  useEffect(() => {
    if (quantumAccount.value) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [quantumAccount.value, setIsConnected]);

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
        isConnected: !!quantumAccount.value,
        error: connectionState.error ?? quantumAccount.error ?? quantumAccountNetworks.error,
        loading:
          connectionState.loading || quantumAccount.loading || quantumAccountNetworks.loading,
        quantumAccount: quantumAccount.value,
        quantumAccountNetworks: quantumAccountNetworks.value,
        account: quantumAccount.value,
        quantum,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext);
