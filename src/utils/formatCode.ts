import prettier, { Options } from "prettier";
import parserBabel from "prettier/parser-babel";

export const formatCode = (code: string, options?: Options) => {
  try {
    return prettier.format(code, {
      parser: "babel",
      semi: true,
      plugins: [parserBabel],
      ...options,
    });
  } catch (e) {
    // ignore
    console.log(e);
  }
  return code;
};
