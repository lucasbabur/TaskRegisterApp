import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { FirebaseProvider } from "../firebase/firebaseContext";
import { FirebaseInitializer } from "@/firebase/firebaseAppConfig";

import Head from "next/head";
import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { CustomTheme } from "@/theme";
import { Text } from "@chakra-ui/react";

import { SEO, LogoObject } from "@/config/metaConfigs";

import {
  Navbar,
  NavbarButton,
  NavbarItem,
  NavbarLogo,
  NavbarToggleColorModeButton,
} from "../components/home/Navbar/index";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider theme={CustomTheme}>
      <FirebaseProvider>
        <FirebaseInitializer />
        <Head>
          <title>{SEO.title}</title>
          <link rel="shortcut icon" href={LogoObject.favicon} />
          <meta name="description" content={SEO.description} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/image/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/image/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/image/favicon-16x16.png"
          />
        </Head>

        <React.StrictMode>
          <Navbar>
            <NavbarLogo ml={6}>
              <Text fontWeight={500}>Task Management</Text>
            </NavbarLogo>
            <NavbarItem
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </NavbarItem>
            <NavbarItem
              onClick={() => {
                router.push("/analysis");
              }}
            >
              Analysis
            </NavbarItem>
            <NavbarItem
              onClick={() => {
                router.push("/habitMonitoring");
              }}
            >
              Habit Tracking
            </NavbarItem>
            <NavbarToggleColorModeButton />
          </Navbar>
          <Component {...pageProps} />
        </React.StrictMode>
      </FirebaseProvider>
    </ChakraProvider>
  );
}
