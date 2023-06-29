import { Button, HStack, Stack, Text, useClipboard, VStack } from "@chakra-ui/react";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { atomone } from "@uiw/codemirror-theme-atomone";
import CodeMirror from "@uiw/react-codemirror";
import { FunctionComponent, useCallback, useRef, useState } from "react";
import { IoIosCopy, IoIosPlay } from "react-icons/io";

export const Example: FunctionComponent<{ example: any }> = ({ example }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState(() => {
    const req = JSON.stringify(example.data, null, "\t").replaceAll("\n", "\n  ");
    return `//${example.name}\ntry {\n\tconst result = await window.ethereum.request(${req});\n\tconsole.log(result);\n} catch(e){\n\tconsole.error(e)\n}\n`;
  });
  const { onCopy, hasCopied } = useClipboard(code);
  const [log, setLog] = useState<string[]>([]);

  const run = useCallback(() => {
    setLog([]);
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
          setLog(data => [
            ...data,
            `// ${method}\n${args.map(item => JSON.stringify(item, null, 2)).join(",")}`,
          ]);
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
    <Stack
      alignItems={"stretch"}
      justifyContent={"stretch"}
      direction={["column", "column", "row"]}
    >
      <VStack alignItems={"stretch"} flex={3} spacing={0}>
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
          <HStack spacing={4}>
            <Button colorScheme={"teal"} size={"sm"} leftIcon={<IoIosCopy />} onClick={onCopy}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
            <Button colorScheme={"primary"} size={"sm"} leftIcon={<IoIosPlay />} onClick={run}>
              Run
            </Button>
          </HStack>
        </HStack>
        <CodeMirror
          value={code}
          theme={atomone}
          height={"400px"}
          minHeight={"100%"}
          extensions={[javascript(), EditorView.lineWrapping]}
          onChange={value => setCode(value)}
          style={{
            flex: 1,
          }}
        />
      </VStack>
      <VStack alignItems={"stretch"} flex={2} backgroundColor={"#272c35"}>
        <HStack
          backgroundColor={"gray.600"}
          userSelect={"none"}
          height={"48px"}
          shadow={"md"}
          paddingY={2}
          paddingX={4}
        >
          <Text color={"whiteAlpha.700"} textAlign={"left"} flex={1}>
            Result
          </Text>
        </HStack>
        <CodeMirror
          value={log.join("\n")}
          theme={atomone}
          editable={false}
          height={"400px"}
          minHeight={"100%"}
          extensions={[javascript(), EditorView.lineWrapping]}
          basicSetup={{
            lineNumbers: false,
          }}
          style={{
            flex: 1,
          }}
        />
      </VStack>
      <iframe
        ref={iframeRef}
        title={"runner"}
        width={"100px"}
        height={"100px"}
        style={{ display: "none" }}
      />
    </Stack>
  );
};
