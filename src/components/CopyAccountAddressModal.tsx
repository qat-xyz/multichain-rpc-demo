import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  VStack,
} from "@chakra-ui/react";
import React, { FunctionComponent } from "react";

import { CopyAddressNetworkItem } from "./CopyAddressNetworkItem";
import { NoResult } from "./NoResult";
import { useConnection } from "../providers/ConnectionProvider";

export const CopyAccountAddressModal: FunctionComponent<Omit<ModalProps, "children">> = props => {
  const { quantumAccount, quantumAccountNetworks } = useConnection();

  return (
    <Modal {...props} size={"sm"} isCentered={true}>
      <ModalOverlay />
      <ModalContent margin={4}>
        <ModalHeader>Account Address</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY={"auto"} paddingBottom={4} maxHeight={"400px"}>
          {quantumAccount ? (
            <VStack alignItems={"stretch"} spacing={4} divider={<Divider />}>
              {quantumAccountNetworks?.map(network => {
                const address = quantumAccount.addresses[network.networkType ?? "EVM"];
                return (
                  address && (
                    <CopyAddressNetworkItem
                      key={`${network.networkType ?? "EVM"}-${network.chainId}-${address}`}
                      network={network}
                      address={address}
                    />
                  )
                );
              })}
            </VStack>
          ) : (
            <NoResult
              title={"No account addresses"}
              description={"Something went wrong, try again."}
              marginTop={14}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
