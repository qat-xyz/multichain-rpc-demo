import { QuantumAccountNetwork } from "../types/QuantumAccountNetwork";

export const normalizeNetworkName = (network: QuantumAccountNetwork) =>
  network.name
    .trim()
    .replace(/mainnet/gi, "")
    .replace(/network/gi, "")
    .split(" ")
    .splice(0, 4)
    .join(" ")
    .trim();
