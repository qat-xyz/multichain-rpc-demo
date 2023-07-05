import { Accordion, AccordionItem } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

import { DocumentationMethod } from "./DocumentationMethod";
import { useParsedSpecs } from "../hooks/useParsedSpecs";

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
    if (specs.value && hash && !scrolledRef.current) {
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
  }, [hash, specs.value]);

  return (
    <Accordion
      defaultIndex={[methods.findIndex((method: any) => hash === `#${method.id}`)]}
      allowMultiple={true}
    >
      {methods.map(method => (
        <AccordionItem key={method.id}>
          {({ isExpanded }) => <DocumentationMethod method={method} isExpanded={isExpanded} />}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
