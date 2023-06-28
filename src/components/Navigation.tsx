import { Box, Container, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

import { ConnectButton } from "./ConnectButton";
import ICON from "../assets/images/icon.png";

export const Navigation: FunctionComponent = () => (
  <Box position={"fixed"} backgroundColor={"white"} width={"100%"} boxShadow={"md"} zIndex={999}>
    <Container maxW={"6xl"} paddingX={6} paddingY={2}>
      <HStack height={"60px"} spacing={4}>
        <NavLink to={"/"}>
          <HStack>
            <Image height={"30px"} pointerEvents="none" src={ICON} />
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Quantum
            </Text>
            <Text
              fontSize={"sm"}
              whiteSpace={"nowrap"}
              noOfLines={1}
              textOverflow={"clip"}
              fontWeight={"semibold"}
              display={{
                base: "none",
                md: "block",
              }}
            >
              <Text color={"purple.500"} as={"span"}>
                True Multichain
              </Text>{" "}
              RPC API
            </Text>
          </HStack>
        </NavLink>
        <Spacer />
        <ConnectButton />
      </HStack>
    </Container>
  </Box>
);
