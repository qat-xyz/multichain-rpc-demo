import { LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { NavLink, useLocation } from "react-router-dom";

import specs from "../assets/json/specs.json";
import { Navigation } from "../components/Navigation";
import { MENU } from "../constants/MENU";

const { info } = specs;

export const Documentation: FunctionComponent = () => {
  const location = useLocation();

  return (
    <Box position={"relative"} minHeight={"100vh"}>
      <Navigation />
      <Container
        maxW={"6xl"}
        bg={"whiteAlpha.800"}
        minHeight={"100vh"}
        boxShadow={"md"}
        paddingX={12}
        paddingY={32}
      >
        <VStack alignItems={"stretch"} spacing={4}>
          <HStack justifyContent={"space-between"}>
            <Heading as="h1" fontSize="2xl">
              {info.title}
            </Heading>
            <Text fontSize={"lg"}>Version {info.version}</Text>
          </HStack>
          <Divider />
          <VStack spacing={12} marginTop={8}>
            {MENU.map(({ id, title, path, description }) => (
              <VStack id={id} key={id} alignItems={"stretch"}>
                <Box>
                  <Button
                    colorScheme={"primary"}
                    variant={"ghost"}
                    as={NavLink}
                    to={path}
                    rightIcon={<LinkIcon opacity={0} transition={"opacity 0.2s"} />}
                    _hover={{
                      ".chakra-button__icon > svg": {
                        opacity: 1,
                      },
                    }}
                    css={{
                      "&.active-hash .chakra-button__icon > svg": {
                        opacity: 1,
                      },
                    }}
                    className={location.hash === `#${id}` ? "active-hash" : ""}
                  >
                    <Heading as="h2" fontSize="xl">
                      {title}
                    </Heading>
                  </Button>
                </Box>
                <Box paddingX={4}>
                  <Text>{description}</Text>
                </Box>
              </VStack>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};
