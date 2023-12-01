import React from "react";
import { useRouter } from "next/router";

import { Button } from "@chakra-ui/react";

interface NavbarButtonProps {
  routerLink?: string;
  display?: string;
  actionButtonClick?: () => void;
  children?: React.ReactNode;
}

export function NavbarButton(props: NavbarButtonProps) {
  return (
    <Button
      display={props?.display}
      colorScheme="orange"
      onClick={props.actionButtonClick}
      as="button"
    >
      {props.children}
    </Button>
  );
}

NavbarButton.displayName = "NavbarButton";
