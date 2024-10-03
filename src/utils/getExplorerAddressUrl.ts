import { EXPLORER_ADDRESS_TYPE_MAP } from "../constants/EXPLORER_ADDRESS_TYPE_MAP";
import { ExplorerAddressType } from "../types/ExplorerAddressType";

export const getExplorerAddressUrl = (
  address: string,
  explorerUrl: string,
  addressType: ExplorerAddressType = "Address",
) => {
  const urlParts = explorerUrl.split("?");
  return `${urlParts[0]}/${EXPLORER_ADDRESS_TYPE_MAP[addressType]}/${address}${
    urlParts[1] ? `?${urlParts[1]}` : ""
  }`;
};
