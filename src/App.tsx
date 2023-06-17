import * as React from "react";
import { ChakraProvider, Text, VStack, theme, Image, Button, Link } from "@chakra-ui/react";
import LOGO from "./assets/logo.png";
import ICON from "./assets/icon.png";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Background } from "./components/Background";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Background />
    <VStack minH="100vh" spacing={8} justifyContent={"center"}>
      <Image h="40vmin" pointerEvents="none" src={LOGO} />
      <Text fontWeight={"semibold"} fontSize={"xx-large"}>
        <Text color={"purple.500"} as={"span"}>
          True Multi-Chain
        </Text>{" "}
        RPC
      </Text>
      {"quantum" in window ? (
        <Button
          variant={"outline"}
          colorScheme={"purple"}
          leftIcon={<Image src={ICON} height={"24px"} />}
          paddingLeft={"8px"}
        >
          Connect Quantum
        </Button>
      ) : (
        <VStack spacing={4}>
          <Text fontWeight={"semibold"}>
            <WarningTwoIcon /> Quantum Wallet is not detected!
          </Text>
          <Text>
            The interactive features in this documentation require installing the Quantum wallet
            extension.
          </Text>
          <Button
            as={Link}
            variant={"outline"}
            colorScheme={"purple"}
            leftIcon={<Image src={ICON} height={"24px"} />}
            paddingLeft={"8px"}
            isExternal={true}
            textDecoration={"none"}
            _hover={{
              textDecoration: "none",
            }}
            href={
              "https://chrome.google.com/webstore/detail/quantum/ajopcimklncnhjednieoejhkffdolemp"
            }
          >
            Install Quantum
          </Button>
        </VStack>
      )}
    </VStack>
  </ChakraProvider>
);
