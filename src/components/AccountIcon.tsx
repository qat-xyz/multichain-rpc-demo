import { Avatar } from "@chakra-ui/react";
import { FunctionComponent } from "react";

export const AccountIcon: FunctionComponent<{
  address: string;
  name?: string;
  size?: string;
}> = ({ name, address, size = "sm" }) => (
  <Avatar
    name={name ?? address}
    size={size}
    src={`https://avatars.dicebear.com/api/identicon/${address}.svg`}
    bg={"gray.200"}
    border={"1px solid"}
    color={"blackAlpha.400"}
    borderRadius={"full"}
    overflow={"hidden"}
    css={{
      img: {
        borderRadius: "0",
      },
    }}
  />
);
