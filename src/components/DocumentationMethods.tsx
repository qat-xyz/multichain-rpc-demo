import { Accordion, AccordionItem, Heading, Text, VStack } from "@chakra-ui/react";
import { groupBy } from "lodash";
import { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

import { DocumentationMethod } from "./DocumentationMethod";
import { useParsedSpecs } from "../hooks/useParsedSpecs";

type NetworkType = "EVM" | "SVM" | "QUANTUM";

export const DocumentationMethods: FunctionComponent = () => {
  const specs = useParsedSpecs();
  const scrolledRef = useRef(false);
  const { hash } = useLocation();

  const methods = useMemo(
    () =>
      specs.value?.methods.map(method => ({
        ...method,
        id: method.name,
      })) ?? [],
    [specs],
  );
  useEffect(() => {
    if (methods.length && hash && !scrolledRef.current) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "auto" });
          scrolledRef.current = true;
        }, 500);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [hash, methods.length]);

  const methodsGroups = useMemo(
    () => groupBy(methods ?? [], item => item.networkType ?? "QUANTUM"),
    [methods],
  );

  return methods.length ? (
    <VStack alignItems={"stretch"} spacing={8}>
      {Object.keys(methodsGroups).map(id => (
        <VStack
          key={id}
          alignItems={"stretch"}
          border={"1px solid"}
          borderColor={"gray.200"}
          borderRadius={"lg"}
          spacing={8}
          padding={8}
        >
          <Heading as="h2" fontSize="xl">
            {specs.value?.networkTypes?.[id as NetworkType].name}
          </Heading>
          <Text>{specs.value?.networkTypes?.[id as NetworkType].description}</Text>
          <Accordion
            defaultIndex={[
              methods.findIndex(
                (method: any) =>
                  hash === `#${method.networkType ? `${method.networkType}_` : ""}${method.id}`,
              ),
            ]}
            allowMultiple={true}
          >
            {methodsGroups[id].map(method => (
              <AccordionItem key={method.id}>
                {({ isExpanded }) => (
                  <DocumentationMethod method={method} isExpanded={isExpanded} />
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      ))}
    </VStack>
  ) : null;
};
