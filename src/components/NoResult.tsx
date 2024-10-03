import { StackProps, Text, VStack } from "@chakra-ui/react";
import { FunctionComponent, ReactElement } from "react";

export const NoResult: FunctionComponent<
  {
    icon?: ReactElement;
    title: string;
    description?: string;
  } & StackProps
> = ({ icon, title, description, ...rest }) => (
  <VStack
    spacing={2}
    color={"gray.300"}
    paddingX={6}
    paddingY={2}
    wordBreak={"break-word"}
    {...rest}
  >
    {icon}
    <VStack spacing={0} textAlign={"center"}>
      <Text fontSize={"lg"} color={"black"} fontWeight={"semibold"}>
        {title}
      </Text>
      {description && <Text color={"gray.600"}>{description}</Text>}
    </VStack>
  </VStack>
);
