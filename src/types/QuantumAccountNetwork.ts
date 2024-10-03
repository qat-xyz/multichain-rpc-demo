export type QuantumAccountNetwork = {
  name: string;
  chainId: number;
  nativeCurrency: {
    symbol?: string;
    decimals?: number;
    name?: string;
  };
  rpc?: string[];
  isTest: boolean;
  infoURL?: string;
  chain?: string;
  color?: string;
  explorers?: {
    name: string;
    url: string;
    icon?: string;
    standard?: string;
  }[];
  networkType?: string;
};
