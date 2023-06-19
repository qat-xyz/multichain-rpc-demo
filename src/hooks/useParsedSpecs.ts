import { $RefParser } from "@apidevtools/json-schema-ref-parser";
import { useAsync } from "react-use";

import specs from "../assets/json/specs.json";

export const useParsedSpecs = () =>
  useAsync(async () => (await $RefParser.dereference(specs)) as typeof specs, []);
