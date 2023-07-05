import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";

import { AccountIcon } from "./AccountIcon";
import ICON from "../assets/images/icon.png";
import ICON_WHITE from "../assets/images/icon.svg";
import { useConnection } from "../providers/ConnectionProvider";
import { shortenAddress } from "../utils/shortenAddress";

export const ConnectButton: FunctionComponent = () => {
  const { quantum, isConnected, connect, disconnect, loading, account } = useConnection();
  const { hasCopied, onCopy } = useClipboard(account ?? "");
  return quantum ? (
    account ? (
      <HStack>
        <ButtonGroup isAttached={true}>
          <Button
            colorScheme={"primary"}
            leftIcon={<AccountIcon address={account} size={"xs"} />}
            onClick={onCopy}
          >
            <Tooltip label={hasCopied ? "Copied!" : "Copy Address"} fontSize={"xs"} padding={1}>
              <Text fontSize={"sm"} fontWeight={"semibold"}>{shortenAddress(account ?? "", 4)}</Text>
            </Tooltip>
          </Button>
          <Tooltip label={"Disconnect"} fontSize={"xs"} padding={1}>
            <IconButton
              aria-label={"disconnect"}
              colorScheme={"primary"}
              variant={"outline"}
              icon={<AiOutlinePoweroff />}
              onClick={() => disconnect()}
            />
          </Tooltip>
        </ButtonGroup>
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
      leftIcon={<Image src={ICON_WHITE} height={"20px"} />}
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
