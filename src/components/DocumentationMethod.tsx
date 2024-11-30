import { LinkIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  HStack,
  Tag,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import ReactJson from "react-json-view";
import ReactMarkdown from "react-markdown";
import { NavLink, useLocation } from "react-router-dom";
import remarkGfm from "remark-gfm";

import { Example } from "./Example";

export const DocumentationMethod: FunctionComponent<{
  isExpanded: boolean;
  method: {
    id: string;
    name: string;
    networkType?: string;
    summary?: string;
    description?: string;
    tags?: any[];
    options?: any;
    params?: any;
    result?: any;
    errors?: any;
    examples?: any[];
  };
}> = ({ method, isExpanded }) => {
  const location = useLocation();
  return (
    <>
      <AccordionButton
        as={NavLink}
        to={`#${method.id}`}
        className={location.hash === `#${method.id}` ? "active-hash" : ""}
        position={"relative"}
        minWidth={0}
        css={{
          "&:hover svg": {
            opacity: 1,
          },
          "&.active-hash svg": {
            opacity: 1,
          },
        }}
        _expanded={{
          backgroundColor: "blackAlpha.50",
        }}
      >
        <Box id={method.id} position={"absolute"} top={"-90px"} />
        <HStack flex={1} marginY={2} minWidth={0}>
          <Text as={"h3"} fontSize={"lg"} fontWeight={"semibold"} noOfLines={1}>
            {method.name}
          </Text>
          <LinkIcon opacity={0} transition={"opacity 0.2s"} />
        </HStack>
        <AccordionIcon marginLeft={2} />
      </AccordionButton>
      <AccordionPanel padding={6} borderX={"1px solid"} borderColor={"gray.200"}>
        <VStack alignItems={"stretch"} spacing={4} divider={<Divider />}>
          <VStack alignItems={"stretch"}>
            {method.summary && (
              <ReactMarkdown
                className={"markdown"}
                remarkPlugins={[remarkGfm]}
                linkTarget={"_blank"}
              >
                {method.summary}
              </ReactMarkdown>
            )}
            {method.description && (
              <ReactMarkdown
                className={"markdown"}
                remarkPlugins={[remarkGfm]}
                linkTarget={"_blank"}
              >
                {method.description}
              </ReactMarkdown>
            )}
            {method.tags?.length && (
              <HStack justifyContent={"flex-end"}>
                {method.tags.map(tag => (
                  <Tooltip key={tag.name} label={tag.description}>
                    <Tag size={"sm"} colorScheme={tag.color} style={{ userSelect: "none" }}>
                      {tag.name}
                    </Tag>
                  </Tooltip>
                ))}
              </HStack>
            )}
          </VStack>
          {method.options && (
            <VStack alignItems={"stretch"} textAlign={"left"}>
              <Text fontWeight={"semibold"}>Options</Text>
              <ReactJson
                name={"options"}
                collapsed={true}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                src={method.options}
                style={{
                  whiteSpace: "nowrap",
                }}
              />
            </VStack>
          )}
          {method.params && Object.keys(method.params)?.length && (
            <VStack alignItems={"stretch"} textAlign={"left"}>
              <Text fontWeight={"semibold"}>Params</Text>
              <ReactJson
                name={"params"}
                collapsed={true}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                src={method.params}
                style={{
                  whiteSpace: "nowrap",
                }}
              />
            </VStack>
          )}
          {method.result && (
            <VStack alignItems={"stretch"} textAlign={"left"}>
              <Text fontWeight={"semibold"}>Result</Text>
              <ReactJson
                name={null}
                collapsed={true}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                src={method.result}
                style={{
                  whiteSpace: "nowrap",
                }}
              />
            </VStack>
          )}
          {method.errors && (
            <VStack alignItems={"stretch"} textAlign={"left"}>
              <Text fontWeight={"semibold"}>Errors</Text>
              <ReactJson
                name={null}
                collapsed={true}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                src={method.errors}
                style={{
                  whiteSpace: "nowrap",
                }}
              />
            </VStack>
          )}
          {method.examples?.length && (
            <VStack alignItems={"stretch"} textAlign={"left"} spacing={2}>
              <Text fontWeight={"semibold"}>Examples</Text>
              {isExpanded && (
                <Accordion defaultIndex={0}>
                  {method.examples.map(example => (
                    <AccordionItem key={example.name} marginTop={2}>
                      <AccordionButton
                        backgroundColor={"primary.500"}
                        color={"white"}
                        fontWeight={"semibold"}
                        _hover={{
                          backgroundColor: "primary.600",
                        }}
                      >
                        <Text as="span" flex="1" textAlign="left" noOfLines={1}>
                          {example.name}
                        </Text>
                        <AccordionIcon color={"white"} />
                      </AccordionButton>
                      <AccordionPanel
                        paddingTop={0}
                        paddingX={2}
                        paddingBottom={2}
                        backgroundColor={"primary.500"}
                      >
                        <Example example={example} networkType={method.networkType ?? "EVM"} />
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </VStack>
          )}
        </VStack>
      </AccordionPanel>
    </>
  );
};
