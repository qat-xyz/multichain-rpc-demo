import { Avatar, AvatarProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";

export const AccountIcon: FunctionComponent<
  AvatarProps & {
    seed: string;
    name?: string;
  }
> = ({ name, seed, size = "sm", ...props }) => (
  <Avatar
    name={name ?? seed}
    size={size}
    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`}
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
