import { LinkIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import ReactJson from "react-json-view";
import ReactMarkdown from "react-markdown";
import { NavLink, useLocation } from "react-router-dom";
import remarkGfm from "remark-gfm";

export const DocumentationMethod: FunctionComponent<{
  id: string;
  name: string;
  description?: string;
  summary?: string;
  params?: any;
  result?: any;
}> = ({ id, name, summary, description, params, result }) => {
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
          </VStack>
          {params?.length && (
            <VStack alignItems={"stretch"} textAlign={"left"}>
              <Text fontWeight={"semibold"}>Params</Text>
              {params.map((param: any) => {
                const { name, ...rest } = param;
                return (
                  <ReactJson
                    key={name}
                    name={name}
                    collapsed={true}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    enableClipboard={false}
                    src={rest}
                  />
                );
              })}
            </VStack>
          )}
          {result &&
            [result].map(data => {
              const { name, ...rest } = data;
              return (
                <VStack alignItems={"stretch"} textAlign={"left"}>
                  <Text fontWeight={"semibold"}>Result</Text>
                  <ReactJson
                    name={name}
                    collapsed={true}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    enableClipboard={false}
                    src={rest}
                  />
                </VStack>
              );
            })}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};
