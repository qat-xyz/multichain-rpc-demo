import { Avatar, AvatarProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";

export const AccountIcon: FunctionComponent<
  AvatarProps & {
    address: string;
    name?: string;
  }
> = ({ name, address, size = "sm", ...props }) => (
  <Avatar
    name={name ?? address}
    size={size}
    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address}`}
    color={"gray.200"}
    borderRadius={"full"}
    overflow={"hidden"}
    backgroundColor={"white"}
    css={{
      img: {
        borderRadius: "0",
        width: "50%",
        height: "50%",
      },
    }}
    {...props}
  />
);
