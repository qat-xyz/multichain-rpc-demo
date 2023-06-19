import { Button, Image, Link } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import ICON from "../assets/images/icon.png";
import ICON_WHITE from "../assets/images/icon.svg";
import { useConnection } from "../providers/ConnectionProvider";

export const ConnectButton: FunctionComponent = () => {
  const { quantum, isConnected, connect, disconnect, loading } = useConnection();
  return quantum ? (
    <Button
      colorScheme={"primary"}
      leftIcon={<Image src={isConnected ? ICON : ICON_WHITE} height={"20px"} />}
      marginLeft={4}
      paddingLeft={3}
      variant={isConnected ? "outline" : "solid"}
      isLoading={loading}
      onClick={isConnected ? disconnect : connect}
    >
      {isConnected ? "Disconnect" : "Connect Quantum"}
    </Button>
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
