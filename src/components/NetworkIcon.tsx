import { Avatar, AvatarProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { QuantumAccountNetwork } from "../types/QuantumAccountNetwork";

export const NetworkIcon: FunctionComponent<{ network?: QuantumAccountNetwork } & AvatarProps> = ({
  network,
  size = "sm",
  ...rest
}) => (
  <Avatar
    size={size}
    src={
      network
        ? `https://raw.githubusercontent.com/qat-xyz/assets/main/networks/${
            network.networkType?.toLowerCase() || "evm"
          }/${network.chainId}.png`
        : undefined
    }
    icon={<></>}
    backgroundColor={"gray.50"}
    borderRadius={"full"}
    overflow={"hidden"}
    name={network?.name ?? network?.chainId.toString()}
    opacity={network?.isTest ? 0.4 : 1}
    css={{
      img: {
        borderRadius: "0",
      },
    }}
    {...rest}
  />
);
