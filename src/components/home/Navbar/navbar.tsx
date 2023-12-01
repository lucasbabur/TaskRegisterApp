import React from "react";
import * as Scroll from "react-scroll";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";

export default function NavBar(props: { children: any }) {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="xl"
        zIndex={99999}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            {React.Children.map(props.children, (child) => {
              if (child.type.displayName == "NavbarLogo") return child;
            })}
          </Flex>

          <HStack
            display="flex"
            alignItems="center"
            spacing={5}
            mr={10}
            bg={bg}
            zIndex={99999}
          >
            <HStack
              spacing={1}
              mr={1}
              color="teal"
              display={{ base: "none", md: "inline-flex" }}
            >
              {React.Children.map(props.children, (child) => {
                if (child.type !== undefined) {
                  if (child.type.displayName == "NavbarItem") return child;
                }
              })}
            </HStack>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open Menu"
                color={useColorModeValue("gray.700", "white")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                {React.Children.map(props.children, (child) => {
                  if (child.type.displayName == "NavbarItem") return child;
                  else if (child.type.displayName == "NavbarButton")
                    return child;
                })}
              </VStack>
            </Box>

            {React.Children.map(props.children, (child) =>
              // prettier-ignore
              {
                const display = {display: { base: "none", sm: "none", md: "flex" }};
                if (child.type.displayName == "NavbarButton") return React.cloneElement(child, display);
              }
            )}
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
}
