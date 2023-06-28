import { Accordion } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

import { DocumentationMethod } from "./DocumentationMethod";
import { useParsedSpecs } from "../hooks/useParsedSpecs";

export const DocumentationMethods: FunctionComponent = () => {
  const specs = useParsedSpecs();
  const scrolledRef = useRef(false);
  const { hash } = useLocation();
  const hashRef = useRef(hash);

  const methods = useMemo(
    () =>
      specs.value?.methods.map(method => ({
        ...method,
        id: method.name,
      })) ?? [],
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
    <Accordion index={[methods.findIndex((method: any) => hash === `#${method.id}`)]}>
      {methods.map(method => (
        <DocumentationMethod key={method.id} method={method} />
      ))}
    </Accordion>
  );
};
