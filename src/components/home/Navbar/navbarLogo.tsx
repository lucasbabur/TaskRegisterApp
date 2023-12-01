import React from "react";

import { Box } from "@chakra-ui/react";

function NavbarLogo(props: { children: React.ReactNode; ml: string | number }) {
  return <Box ml={props.ml}>{props.children}</Box>;
}
NavbarLogo.displayName = "NavbarLogo";
export default NavbarLogo;
