import { Icon } from "@chakra-ui/icons";
import { IconProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";

export const CopyIcon: FunctionComponent<{ size?: string } & IconProps> = ({ size, ...props }) => (
  <Icon fill="currentColor" viewBox="0 0 24 24" width={size} height={size} {...props}>
    <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
  </Icon>
);
