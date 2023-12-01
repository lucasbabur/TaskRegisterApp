import { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import { initialColorModeConfiguration } from "@/theme";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={initialColorModeConfiguration} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
