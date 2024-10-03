export type QuantumAccount = {
  id: string;
  name?: string;
  walletName?: string;
  addresses: {
    [networkType: string]: string;
  };
};
