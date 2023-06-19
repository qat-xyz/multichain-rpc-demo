import { Box, Container, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

import { DocumentationSection } from "../components/DocumentationSection";
import { Navigation } from "../components/Navigation";
import { MENU } from "../constants/MENU";
import { useParsedSpecs } from "../hooks/useParsedSpecs";
import { useSpecsInfo } from "../hooks/useSpecsInfo";
import { MenuId } from "../types/MenuId";

export const Documentation: FunctionComponent = () => {
  const { hash } = useLocation();
  const scrolledRef = useRef(false);
  const hashRef = useRef(hash);
  const info = useSpecsInfo();
  const specs = useParsedSpecs();

  const methods = useMemo<{
    [Id in MenuId]: any[];
  }>(
    () => ({
      "multi-chain-api":
        specs.value?.methods
          .filter(method =>
            method.tags.some(
              (tag: any) => tag.name === specs.value?.components.tags["Multi-Chain"].name,
            ),
          )
          .map(method => ({
            ...method,
            id: `multi-chain-api/${method.name}`,
          })) ?? [],
      "standard-api":
        specs.value?.methods
          .filter(method =>
            method.tags.some(
              (tag: any) => tag.name === specs.value?.components.tags["Standard"].name,
            ),
          )
          .map(method => ({
            ...method,
            id: `standard-api/${method.name}`,
          })) ?? [],
    }),
    [specs],
  );

  useEffect(() => {
    if (specs.value && hash) {
      // We want to reset if the hash has changed
      if (hashRef.current !== hash) {
        hashRef.current = hash;
        scrolledRef.current = false;
      }

      // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
      if (!scrolledRef.current) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const timer = setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
            scrolledRef.current = true;
          }, 100);
          return () => {
            clearTimeout(timer);
          };
        }
      }
    }
  }, [hash, specs.value]);

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
              <DocumentationSection
                id={id}
                key={id}
                title={title}
                path={path}
                description={description}
                methods={methods[id] ?? []}
              />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};
