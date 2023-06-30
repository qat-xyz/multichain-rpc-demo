import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Stack,
  Text,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";
import CodeMirror from "@uiw/react-codemirror";
import { FunctionComponent, useCallback, useRef, useState } from "react";
import { IoIosCopy, IoIosPlay, IoIosTrash, IoMdList } from "react-icons/io";

import { formatCode } from "../utils/formatCode";

export const Example: FunctionComponent<{ example: any }> = ({ example }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState(() =>
    formatCode(
      `// ${example.name}
      try {
        const result = await window.ethereum.request(${JSON.stringify(example.data)});
        console.log(result);
      } catch(e){
        console.error(e)
      }`,
    ),
  );
  const { onCopy, hasCopied } = useClipboard(code);
  const [log, setLog] = useState<string>("");
  const { onCopy: onCopyResult, hasCopied: hasCopiedResult } = useClipboard(log);

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
      <Stack
        spacing={1}
        direction={{
          base: "column",
          lg: "row",
        }}
      >
        <VStack alignItems={"stretch"} spacing={0} flex={1}>
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
            <ButtonGroup
              display={{
                base: "flex",
                lg: "none",
              }}
            >
              <IconButton
                aria-label={"format"}
                colorScheme={"messenger"}
                size={"sm"}
                icon={<IoMdList />}
                onClick={() => setCode(formatCode(code))}
              />
              <IconButton
                aria-label={"copy"}
                colorScheme={"teal"}
                size={"sm"}
                icon={<IoIosCopy />}
                onClick={onCopy}
              />
              <IconButton
                aria-label={"run"}
                colorScheme={"primary"}
                size={"sm"}
                icon={<IoIosPlay />}
                onClick={run}
              />
            </ButtonGroup>
            <ButtonGroup
              display={{
                base: "none",
                lg: "flex",
              }}
            >
              <Button
                colorScheme={"messenger"}
                size={"sm"}
                leftIcon={<IoMdList />}
                onClick={() => setCode(formatCode(code))}
              >
                Format
              </Button>
              <Button colorScheme={"teal"} size={"sm"} leftIcon={<IoIosCopy />} onClick={onCopy}>
                {hasCopied ? "Copied" : "Copy"}
              </Button>
              <Button colorScheme={"primary"} size={"sm"} leftIcon={<IoIosPlay />} onClick={run}>
                Run
              </Button>
            </ButtonGroup>
          </HStack>
          <CodeMirror
            value={code}
            theme={atomone}
            height={"100%"}
            maxHeight={"600px"}
            extensions={[javascript()]}
            onChange={value => setCode(value)}
            style={{
              flex: 1,
            }}
          />
        </VStack>
        <VStack
          alignItems={"stretch"}
          spacing={0}
          width={{
            base: "100%",
            lg: "35%",
          }}
        >
          <HStack
            backgroundColor={"gray.600"}
            userSelect={"none"}
            height={"48px"}
            shadow={"md"}
            paddingY={2}
            paddingX={4}
          >
            <Text color={"whiteAlpha.700"} textAlign={"left"} flex={1}>
              Output
            </Text>
            <ButtonGroup
              display={{
                base: "none",
                lg: "flex",
              }}
            >
              <Button
                colorScheme={"blackAlpha"}
                size={"sm"}
                leftIcon={<IoIosTrash />}
                onClick={() => setLog("")}
              >
                Clear
              </Button>
              <Button
                colorScheme={"teal"}
                size={"sm"}
                leftIcon={<IoIosCopy />}
                onClick={onCopyResult}
              >
                {hasCopiedResult ? "Copied" : "Copy"}
              </Button>
            </ButtonGroup>
            <ButtonGroup
              display={{
                base: "flex",
                lg: "none",
              }}
            >
              <IconButton
                aria-label={"clear"}
                colorScheme={"blackAlpha"}
                size={"sm"}
                icon={<IoIosTrash />}
                onClick={() => setLog("")}
              />
              <IconButton
                aria-label={"copy result"}
                colorScheme={"teal"}
                size={"sm"}
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
            maxHeight={"600px"}
            extensions={[javascript()]}
            basicSetup={{
              lineNumbers: false,
            }}
            style={{
              flex: 1,
            }}
          />
        </VStack>
      </Stack>
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
