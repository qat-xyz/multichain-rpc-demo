import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import { globalStyle } from "./globalStyle";
import { colors } from "./units/colors";
import { fonts } from "./units/fonts";

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
    disableTransitionOnChange: true,
  } as ThemeConfig,
  styles: {
    global: globalStyle,
  },
  colors,
  fonts,
  shadows: {
    outline: "none",
  },
});
