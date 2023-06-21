import { Button, Image, Link, Text, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";

import ICON from "../assets/images/icon.svg";
import LOGO from "../assets/images/logo.png";
import { useConnection } from "../providers/ConnectionProvider";

export const Home: FunctionComponent = () => {
  const { quantum } = useConnection();
  return (
    <VStack minH="100vh" spacing={8} justifyContent={"center"} padding={4} textAlign={"center"}>
      <Image h="40vmin" pointerEvents="none" src={LOGO} />
      <Text fontWeight={"semibold"} fontSize={"xx-large"}>
        <Text color={"purple.500"} as={"span"} whiteSpace={"nowrap"}>
          True Multichain
        </Text>{" "}
        <Text as={"span"} whiteSpace={"nowrap"}>
          RPC API
        </Text>
      </Text>
      <Text fontSize={"lg"} maxWidth={"700px"}>
        This documentation provides an interactive demonstration of the Quantum wallet extension RPC
        API, highlighting both its standard and true multi-chain capabilities.
      </Text>
      {!quantum && (
        <Text fontWeight={"semibold"} color={"red"}>
          Quantum wallet is not detected!
        </Text>
      )}
      <VStack spacing={4}>
        {!quantum && (
          <Button
            as={Link}
            colorScheme={"primary"}
            leftIcon={<Image src={ICON} height={"24px"} />}
            paddingLeft={"8px"}
            isExternal={true}
            textDecoration={"none !important"}
            href={
              "https://chrome.google.com/webstore/detail/quantum/ajopcimklncnhjednieoejhkffdolemp"
            }
          >
            Install Quantum
          </Button>
        )}
        <Button
          as={RouterLink}
          variant={quantum ? "solid" : "outline"}
          colorScheme={"primary"}
          textDecoration={"none !important"}
          to={"/documentation"}
        >
          Proceed to the Interactive Documentation
        </Button>
      </VStack>
    </VStack>
  );
};
