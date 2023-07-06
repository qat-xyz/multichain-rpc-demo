import { Box, Container, Divider, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { DocumentationMethods } from "../components/DocumentationMethods";
import { Navigation } from "../components/Navigation";
import { useSpecsInfo } from "../hooks/useSpecsInfo";

export const Documentation: FunctionComponent = () => {
  const info = useSpecsInfo();

  return (
    <Box position={"relative"} minHeight={"100vh"}>
      <Navigation />
      <Container
        maxW={"7xl"}
        bg={"whiteAlpha.800"}
        minHeight={"100vh"}
        boxShadow={"md"}
        paddingX={{ base: 6, lg: 12 }}
        paddingY={{ base: 28, lg: 32 }}
      >
        <VStack alignItems={"stretch"} spacing={8}>
          <Stack
            alignItems={"stretch"}
            justifyContent={"space-between"}
            direction={{
              base: "column",
              lg: "row",
            }}
          >
            <Heading as="h1" fontSize="2xl">
              {info.title}
            </Heading>
            <Text color={"gray.500"} whiteSpace={"nowrap"}>
              Version {info.version}
            </Text>
          </Stack>
          <Divider />
          <VStack>
            <Text>
              Quantum RPC methods constitute a new, innovative standard that offers Web3
              applications an API that empowers developers to construct a highly intuitive and
              user-friendly multi-chain user experience while maintaining backward compatibility
              with the commonly used RPC standard methods.
            </Text>
            <Text>
              To achieve this goal, Quantum RPC provides a set of new multi-chain methods to
              interact with the user networks, in addition to a new optional RPC{" "}
              <Text as={"span"} fontWeight={"bold"}>
                `options`
              </Text>{" "}
              property that allows developers to target a specific user network or chain ID.
            </Text>
          </VStack>
          <DocumentationMethods />
        </VStack>
      </Container>
    </Box>
  );
};
