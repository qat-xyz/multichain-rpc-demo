import { Box } from "@chakra-ui/react";
import { PanelResizeHandle } from "react-resizable-panels";

export const ResizeHandle = () => (
  <Box
    as={PanelResizeHandle}
    flex={"0 0 0.5em"}
    position={"relative"}
    outline={"none"}
    css={{
      "&[data-resize-handle-active] > div": {
        backgroundColor: "rgba(128,90,213,0.5)",
      },
    }}
  >
    <Box
      position={"absolute"}
      top={"0"}
      bottom={"0"}
      left={"0.1em"}
      right={"0.1em"}
      transition={"background-color 0.2s linear"}
    />
  </Box>
);
