import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const colors = {
  brand: {
    100: "#f7fafc",
    900: "#1a202c",
  },
  primary: {
    50: "#ff696c",
    100: "#ff6264",
    200: "#ff5b5d",
    300: "#ff5456",
    400: "#f04d4f",
    500: "#db4648",
    600: "#c53f40",
    700: "#af3839",
    800: "#993132",
    900: "#832a2b",
  },
  secondary: {
    50: "#915a72",
    100: "#87546a",
    200: "#7e4e62",
    300: "#74485b",
    400: "#6a4253",
    500: "#613c4c",
    600: "#573644",
    700: "#4d303c",
    800: "#432a35",
    900: "#3a242d",
  },
  tertiary: {
    50: "#ffdf7c",
    100: "#ffd074",
    200: "#ffc16b",
    300: "#ffb263",
    400: "#ffa35b",
    500: "#fb9553",
    600: "#e1864a",
    700: "#c87742",
    800: "#af683a",
    900: "#965931",
  },
};

// Sample
const fonts = {
  // heading: "Arial, sans-serif",
  // body: "Roboto, sans-serif",
};

const components = {
  // Other components go here
  Text: {
    variants: {
      heading: {
        fontSize: "4xl",
        fontWeight: "bold",
      },
      paragraph: {
        fontSize: "md",
        fontWeight: "normal",
      },
    },
  },
};

export const initialColorModeConfiguration: "dark" | "light" = "light";

export const CustomTheme = extendTheme({
  colors,
  fonts,
  components,
});
