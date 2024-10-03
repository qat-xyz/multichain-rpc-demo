import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";

import { AccountIcon } from "./AccountIcon";
import { CopyAccountAddressModal } from "./CopyAccountAddressModal";
import { CopyIcon } from "./CopyIcon";
import ICON from "../assets/images/icon.png";
import ICON_WHITE from "../assets/images/icon.svg";
import { useConnection } from "../providers/ConnectionProvider";

export const ConnectButton: FunctionComponent = () => {
  const { quantum, isConnected, connect, disconnect, loading, quantumAccount } = useConnection();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return quantum ? (
    quantumAccount ? (
      <HStack>
        <ButtonGroup isAttached={true}>
          <Tooltip label={"Copy Address"} fontSize={"xs"} padding={1}>
            <Button
              colorScheme={"primary"}
              height={"auto"}
              borderRadius={"full"}
              borderRight={"1px solid rgba(0,0,0,0.12)"}
              paddingX={1.5}
              paddingY={1}
              paddingRight={4}
              rightIcon={<CopyIcon fontSize={"16px"} marginLeft={2} />}
              onClick={() => setIsModalOpen(true)}
            >
              <HStack lineHeight={1.4}>
                <AccountIcon
                  name={quantumAccount.name}
                  border={"1px solid"}
                  seed={quantumAccount.id}
                />
                <VStack alignItems={"flex-start"} spacing={0}>
                  {quantumAccount.walletName && (
                    <Text fontSize={"xs"} fontWeight={"medium"} opacity={0.7}>
                      {quantumAccount.walletName}
                    </Text>
                  )}
                  <Text
                    isTruncated={true}
                    textAlign={"left"}
                    fontSize={"14px"}
                    fontWeight={"medium"}
                  >
                    {quantumAccount.name}
                  </Text>
                </VStack>
              </HStack>
            </Button>
          </Tooltip>
          <Tooltip label={"Disconnect"} fontSize={"xs"} padding={1}>
            <IconButton
              aria-label={"disconnect"}
              colorScheme={"primary"}
              variant={"outline"}
              height={"auto"}
              borderRadius={"38px"}
              icon={<AiOutlinePoweroff />}
              onClick={() => disconnect()}
            />
          </Tooltip>
        </ButtonGroup>
        <CopyAccountAddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </HStack>
    ) : (
      <Button
        colorScheme={"primary"}
        leftIcon={<Image src={isConnected ? ICON : ICON_WHITE} height={"20px"} />}
        marginLeft={4}
        paddingLeft={3}
        isLoading={loading}
        onClick={connect}
      >
        Connect Quantum
      </Button>
    )
  ) : (
    <Button
      as={Link}
      colorScheme={"primary"}
      leftIcon={<Image src={ICON_WHITE} height={"20px"} width={"20px"} />}
      marginLeft={4}
      paddingLeft={3}
      textDecoration={"none !important"}
      href={"https://chrome.google.com/webstore/detail/quantum/ajopcimklncnhjednieoejhkffdolemp"}
      isExternal={true}
    >
      Install Quantum
    </Button>
  );
};
