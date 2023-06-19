import { LinkIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Code,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const DocumentationMethod: FunctionComponent<{
  id: string;
  name: string;
  description?: string;
}> = ({ id, name, description }) => {
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
      >
        <Box id={id} position={"absolute"} top={"-90px"} />
        <HStack flex={1} marginY={2}>
          <Code as={"h3"} fontSize={"lg"}>
            {name}
          </Code>
          <LinkIcon opacity={0} transition={"opacity 0.2s"} />
        </HStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel paddingBottom={4}>
        <VStack alignItems={"stretch"}>{description && <Text>{description}</Text>}</VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};
