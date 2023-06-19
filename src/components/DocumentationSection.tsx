import { LinkIcon } from "@chakra-ui/icons";
import { Accordion, Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { DocumentationMethod } from "./DocumentationMethod";

export const DocumentationSection: FunctionComponent<{
  id: string;
  path: string;
  title: string;
  description: string;
  methods: any[];
}> = ({ id, path, title, description, methods }) => {
  const location = useLocation();
  return (
    <VStack alignItems={"stretch"} position={"relative"}>
      <Box id={id} position={"absolute"} top={"-110px"} />
      <Box>
        <Button
          colorScheme={"primary"}
          variant={"ghost"}
          as={NavLink}
          to={path}
          rightIcon={<LinkIcon opacity={0} transition={"opacity 0.2s"} />}
          className={location.hash.startsWith(`#${id}`) ? "active-hash" : ""}
          _hover={{
            ".chakra-button__icon > svg": {
              opacity: 1,
            },
          }}
          css={{
            "&.active-hash .chakra-button__icon > svg": {
              opacity: 1,
            },
          }}
        >
          <Heading as="h2" fontSize="xl">
            {title}
          </Heading>
        </Button>
      </Box>
      <VStack alignItems={"stretch"} paddingX={4} spacing={8}>
        <Text>{description}</Text>
        <Accordion index={[methods.findIndex((method: any) => location.hash === `#${method.id}`)]}>
          {methods.map(method => (
            <DocumentationMethod
              id={method.id}
              key={method.id}
              name={method.name}
              description={method.description}
            />
          ))}
        </Accordion>
      </VStack>
    </VStack>
  );
};
