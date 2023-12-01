import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function NavbarToggleColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <IconButton
        icon={colorMode == "light" ? <SunIcon /> : <MoonIcon />}
        aria-label="toggle color mode"
        size="sm"
        onClick={toggleColorMode}
        variant=""
      />
    </>
  );
}
NavbarToggleColorModeButton.displayName = "NavbarItem";
export default NavbarToggleColorModeButton;
