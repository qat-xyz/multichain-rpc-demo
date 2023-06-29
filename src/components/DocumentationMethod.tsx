import { LinkIcon } from "@chakra-ui/icons";
import {
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
  method: {
    id: string;
    name: string;
    summary?: string;
    description?: string;
    tags?: any[];
    options?: any;
    params?: any;
    result?: any;
    errors?: any;
    examples?: any[];
  };
}> = ({ method }) => {
  const { id, name, summary, description, tags, options, params, result, errors, examples } =
    method;
  const location = useLocation();
  return (
    <AccordionItem>
      <AccordionButton
        as={NavLink}
        to={`#${id}`}
        className={location.hash === `#${id}` ? "active-hash" : ""}
        position={"relative"}
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
        <Box id={id} position={"absolute"} top={"-90px"} />
        <HStack flex={1} marginY={2}>
          <Text as={"h3"} fontSize={"lg"} fontWeight={"semibold"}>
            {name}
          </Text>
          <LinkIcon opacity={0} transition={"opacity 0.2s"} />
        </HStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel padding={6} borderX={"1px solid"} borderColor={"gray.200"}>
        <VStack alignItems={"stretch"} spacing={4} divider={<Divider />}>
          <VStack alignItems={"stretch"}>
            {summary && (
              <ReactMarkdown
                className={"markdown"}
                remarkPlugins={[remarkGfm]}
                linkTarget={"_blank"}
              >
                {summary}
              </ReactMarkdown>
            )}
            {description && (
              <ReactMarkdown
                className={"markdown"}
                remarkPlugins={[remarkGfm]}
                linkTarget={"_blank"}
              >
                {description}
              </ReactMarkdown>
            )}
            {tags?.length && (
              <HStack justifyContent={"flex-end"}>
                {tags.map(tag => (
                  <Tooltip key={tag.name} label={tag.description}>
                    <Tag size={"sm"} colorScheme={tag.color} style={{ userSelect: "none" }}>
                      {tag.name}
                    </Tag>
                  </Tooltip>
                ))}
              </HStack>
            )}
          </VStack>
          {options && (
            <VStack alignItems={"stretch"} textAlign={"left"}>
              <Text fontWeight={"semibold"}>Options</Text>
              <ReactJson
                name={"options"}
                collapsed={true}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                src={options}
              />
            </VStack>
          )}
          {params?.length && (
            <VStack alignItems={"stretch"} textAlign={"left"}>
              <Text fontWeight={"semibold"}>Params</Text>
              <ReactJson
                key={name}
                name={"params"}
                collapsed={true}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                src={params.map((param: any) => param.schema)}
              />
            </VStack>
          )}
          {result && (
            <VStack alignItems={"stretch"} textAlign={"left"}>
              <Text fontWeight={"semibold"}>Result</Text>
              <ReactJson
                name={null}
                collapsed={true}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                src={result.schema}
              />
            </VStack>
          )}
          {errors && (
            <VStack alignItems={"stretch"} textAlign={"left"}>
              <Text fontWeight={"semibold"}>Errors</Text>
              <ReactJson
                name={null}
                collapsed={true}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                src={errors}
              />
            </VStack>
          )}
          {examples?.length && (
            <VStack alignItems={"stretch"} textAlign={"left"}>
              <Text fontWeight={"semibold"}>Examples</Text>
              {examples.map(example => (
                <Example key={example.name} example={example} />
              ))}
            </VStack>
          )}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};
