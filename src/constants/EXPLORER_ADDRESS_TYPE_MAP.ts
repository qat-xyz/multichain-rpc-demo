import { ExplorerAddressType } from "../types/ExplorerAddressType";

export const EXPLORER_ADDRESS_TYPE_MAP: { [Type in ExplorerAddressType]: string } = {
  Address: "address",
  Transaction: "tx",
  Token: "token",
  Block: "block",
};
