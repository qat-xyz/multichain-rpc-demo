import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";
import CodeMirror from "@uiw/react-codemirror";
import { FunctionComponent, useCallback, useRef, useState } from "react";
import { IoIosCopy, IoIosPlay, IoIosTrash, IoMdList, IoMdRefresh } from "react-icons/io";
import { Panel, PanelGroup } from "react-resizable-panels";

import { ResizeHandle } from "./ResizeHandle";
import { formatCode } from "../utils/formatCode";

export const Example: FunctionComponent<{ example: any }> = ({ example }) => {
  const defaultCode = formatCode(
    `// ${example.name}
      try {
        const result = await window.ethereum.request(${JSON.stringify(example.data)});
        console.log(result);
      } catch(e){
        console.error(e)
      }
      `,
  );
  const [code, setCode] = useState(defaultCode);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { onCopy } = useClipboard(code);
  const [log, setLog] = useState<string>("");
  const { onCopy: onCopyResult } = useClipboard(log);

  const run = useCallback(() => {
    setLog("");
    const iframeWindow = iframeRef.current?.contentWindow;

    // Capture console output
    if (iframeWindow) {
      // polyfill the console object
      const iframeConsole: any = {};

      // Define console methods if they don't exist
      const consoleMethods = [
        "log",
        "info",
        "warn",
        "error",
        "debug",
        "clear",
        "dir",
        "dirxml",
        "table",
        "trace",
        "group",
        "groupCollapsed",
        "groupEnd",
        "time",
        "timeEnd",
        "timeStamp",
        "profile",
        "profileEnd",
        "count",
        "assert",
      ];

      for (const method of consoleMethods) {
        iframeConsole[method] = (...args: any[]) => {
          setLog(
            data =>
              data +
              `// ${method}\n${args
                .map(arg =>
                  formatCode(JSON.stringify(arg, null, 2), {
                    semi: false,
                  })
                    .trim()
                    .replace(/^;/gm, ""),
                )
                .join(" ")}\n`,
          );
        };
      }
      // @ts-ignore
      iframeWindow.console = iframeConsole;
      // @ts-ignore
      iframeWindow.ethereum = window.quantum;
      // @ts-ignore
      iframeWindow.eval(`(async () => {${code}})()`);
    }
  }, [code, setLog]);

  return (
    <Box>
      <PanelGroup
        direction={
          useBreakpointValue({
            base: "vertical",
            lg: "horizontal",
          }) ?? "vertical"
        }
      >
        <Panel
          order={1}
          defaultSize={65}
          minSize={37}
          maxSize={82}
          style={{
            display: "flex",
            flexDirection: "column",
            overflow:
              useBreakpointValue({
                base: "visible",
                lg: "hidden",
              }) ?? "visible",
          }}
        >
          <VStack alignItems={"stretch"} spacing={0} flex={1} width={"100%"} height={"100%"}>
            <HStack
              backgroundColor={"gray.600"}
              userSelect={"none"}
              height={"48px"}
              shadow={"md"}
              paddingY={2}
              paddingX={4}
            >
              <Text color={"whiteAlpha.700"} textAlign={"left"} noOfLines={1} flex={1}>
                Editable Example
              </Text>
              <ButtonGroup>
                {code !== defaultCode && (
                  <IconButton
                    aria-label={"reset"}
                    colorScheme={"blackAlpha"}
                    size={"sm"}
                    title={"Reset"}
                    icon={<IoMdRefresh />}
                    onClick={() => setCode(defaultCode)}
                  />
                )}
                <IconButton
                  aria-label={"format"}
                  colorScheme={"messenger"}
                  size={"sm"}
                  title={"Format"}
                  icon={<IoMdList />}
                  onClick={() => setCode(formatCode(code))}
                />
                <IconButton
                  aria-label={"copy"}
                  colorScheme={"teal"}
                  size={"sm"}
                  title={"Copy"}
                  icon={<IoIosCopy />}
                  onClick={onCopy}
                />
                <Button
                  aria-label={"run"}
                  colorScheme={"primary"}
                  size={"sm"}
                  leftIcon={<IoIosPlay />}
                  onClick={run}
                >
                  Run
                </Button>
              </ButtonGroup>
            </HStack>
            <CodeMirror
              value={code}
              theme={atomone}
              height={"100%"}
              maxHeight={"500px"}
              extensions={[javascript()]}
              onChange={value => setCode(value)}
              style={{
                flex: 1,
              }}
            />
          </VStack>
        </Panel>
        <ResizeHandle />
        <Panel
          order={2}
          style={{
            display: "flex",
            flexDirection: "column",
            overflow:
              useBreakpointValue({
                base: "visible",
                lg: "hidden",
              }) ?? "visible",
          }}
        >
          <VStack alignItems={"stretch"} spacing={0} width={"100%"} height={"100%"}>
            <HStack
              backgroundColor={"gray.600"}
              userSelect={"none"}
              height={"48px"}
              shadow={"md"}
              paddingY={2}
              paddingX={4}
            >
              <Text color={"whiteAlpha.700"} textAlign={"left"} noOfLines={1} flex={1}>
                Output
              </Text>
              <ButtonGroup>
                <IconButton
                  aria-label={"clear"}
                  colorScheme={"blackAlpha"}
                  size={"sm"}
                  title={"Clear"}
                  icon={<IoIosTrash />}
                  onClick={() => setLog("")}
                />
                <IconButton
                  aria-label={"copy result"}
                  colorScheme={"teal"}
                  size={"sm"}
                  title={"Copy"}
                  icon={<IoIosCopy />}
                  onClick={onCopyResult}
                />
              </ButtonGroup>
            </HStack>
            <CodeMirror
              value={log}
              theme={atomone}
              editable={false}
              height={"100%"}
              maxHeight={"500px"}
              extensions={[javascript()]}
              basicSetup={{
                lineNumbers: false,
              }}
              style={{
                flex: 1,
              }}
            />
          </VStack>
        </Panel>
      </PanelGroup>
      <iframe
        ref={iframeRef}
        title={"runner"}
        width={"100px"}
        height={"100px"}
        style={{ display: "none" }}
      />
    </Box>
  );
};
