import { IconType } from "react-icons";

import { FiCompass, FiStar, FiClipboard, FiLogOut } from "react-icons/fi";
import { Box, Flex, Icon, FlexProps, Text } from "@chakra-ui/react";
import { useSidebar } from "@/components/generalAbstractions/sidebar/sidebarContext";
import { useRouter } from "next/router";
import { SEO } from "../config/metaConfigs";

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  name: string;
}

const NavItem = ({ icon, children, name, href, ...rest }: NavItemProps) => {
  const { activeSidebar } = useSidebar();
  const router = useRouter();

  return (
    <Box
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={() => {
        activeSidebar.value = name;
        router.push(href);
      }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={activeSidebar.value === name ? "orange.600" : ""}
        _hover={{
          bg: "orange.600",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Text>{name}</Text>
      </Flex>
    </Box>
  );
};

export const SidebarNavItems = () => {
  return (
    <>
      <NavItem
        key={"TestPage 1"}
        icon={FiClipboard}
        href={"/logged/testPage1"}
        name={"testPage 1"}
      />
      <NavItem
        key={"TestPage 2"}
        icon={FiStar}
        href={"/logged/testPage2"}
        name={"testPage 2"}
      />
      <NavItem
        key={"TestPage 3"}
        icon={FiCompass}
        href={"/logged/testPage3"}
        name={"testPage 3"}
      />
      <NavItem
        key={"Logout"}
        icon={FiLogOut}
        href={"/logged/logout"}
        name={"Logout"}
      />
    </>
  );
};
