import { HamburgerIcon, LinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { ConnectButton } from "./ConnectButton";
import ICON from "../assets/images/icon.png";
import { MENU } from "../constants/MENU";

export const Navigation: FunctionComponent = () => {
  const location = useLocation();

  return (
    <Box position={"fixed"} backgroundColor={"white"} width={"100%"} boxShadow={"md"} zIndex={999}>
      <Container maxW={"6xl"} paddingX={6} paddingY={2}>
        <HStack height={"60px"} spacing={4}>
          <NavLink to={"/"}>
            <HStack>
              <Image height={"30px"} pointerEvents="none" src={ICON} />
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Quantum
              </Text>
              <Text
                fontSize={"sm"}
                whiteSpace={"nowrap"}
                noOfLines={1}
                textOverflow={"clip"}
                display={{
                  base: "none",
                  md: "block",
                }}
              >
                True{" "}
                <Text color={"purple.500"} as={"span"}>
                  Multi-Chain
                </Text>{" "}
                RPC API
              </Text>
            </HStack>
          </NavLink>
          <Spacer />
          <HStack
            display={{
              base: "none",
              lg: "flex",
            }}
          >
            {MENU.map(({ id, title, path }) => (
              <Button
                key={id}
                as={NavLink}
                variant={"ghost"}
                colorScheme={"primary"}
                to={path}
                isActive={location.hash === `#${id}`}
              >
                {title}
              </Button>
            ))}
          </HStack>
          <ConnectButton />
          <Box
            display={{
              base: "flex",
              lg: "none",
            }}
          >
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Menu"
                colorScheme={"primary"}
                variant="outline"
                icon={<HamburgerIcon />}
              />
              <MenuList>
                {MENU.map(({ id, title, path }) => (
                  <MenuItem
                    key={id}
                    as={NavLink}
                    to={path}
                    icon={<LinkIcon opacity={location.hash === `#${id}` ? 1 : 0} />}
                  >
                    {title}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </Container>
    </Box>
  );
};
