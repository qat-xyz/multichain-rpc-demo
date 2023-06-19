import { MenuId } from "../types/MenuId";

export const MENU: {
  id: MenuId;
  title: string;
  path: string;
  description: string;
}[] = [
  {
    id: "multi-chain-api",
    title: "Multi-Chain API",
    path: "/documentation#multi-chain-api",
    description:
      "The Multi-Chain methods constitute a new, innovative standard that offers Web3 applications an API empowering developers to construct a highly intuitive and user-friendly multi-chain user experience.",
  },
  {
    id: "standard-api",
    title: "Standard API",
    path: "/documentation#standard-api",
    description:
      "The Standard RPC methods encompass a set of commonly implemented RPC methods found in the majority of existing wallets. These methods serve as a standardized interface for communication and interaction with the blockchain network, ensuring compatibility and ease of integration across various wallet implementations.",
  },
];
