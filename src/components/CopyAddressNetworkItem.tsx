import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  HStack,
  IconButton,
  Link,
  Text,
  Tooltip,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import React, { FunctionComponent } from "react";

import { CopyIcon } from "./CopyIcon";
import { NetworkIcon } from "./NetworkIcon";
import { QuantumAccountNetwork } from "../types/QuantumAccountNetwork";
import { getExplorerAddressUrl } from "../utils/getExplorerAddressUrl";
import { normalizeNetworkName } from "../utils/normalizeNetworkName";
import { shortenAddress } from "../utils/shortenAddress";

export const CopyAddressNetworkItem: FunctionComponent<{
  address: string;
  network: QuantumAccountNetwork;
}> = ({ address, network }) => {
  const { hasCopied, onCopy } = useClipboard(address ?? "");
  return (
    <HStack spacing={4}>
      <HStack spacing={3} flex={1}>
        <NetworkIcon network={network} size={"sm"} />
        <VStack fontSize={"sm"} alignItems={"stretch"} spacing={0}>
          <Text noOfLines={1} fontWeight={"medium"}>
            {normalizeNetworkName(network)}
          </Text>
          <Text fontSize={"xs"}>{shortenAddress(address, 8)}</Text>
        </VStack>
      </HStack>
      <ButtonGroup variant={"outline"} size={"md"}>
        <Tooltip
          label={hasCopied ? "Copied!" : "Copy Address"}
          fontSize={"xs"}
          padding={1}
          closeOnClick={false}
        >
          <IconButton
            aria-label={"Copy Address"}
            whiteSpace={"normal"}
            tabIndex={-1}
            icon={<CopyIcon size={"16px"} />}
            onClick={onCopy}
          />
        </Tooltip>
        <Tooltip label={"View on Explorer"} fontSize={"xs"} padding={1} closeOnClick={true}>
          {network.explorers?.at(0)?.url && (
            <IconButton
              aria-label={"Account Explorer Menu"}
              icon={<ExternalLinkIcon fontSize={"16px"} />}
              tabIndex={-1}
              as={Link}
              href={getExplorerAddressUrl(address, network.explorers?.at(0)?.url ?? "")}
              isExternal={true}
            />
          )}
        </Tooltip>
      </ButtonGroup>
    </HStack>
  );
};
