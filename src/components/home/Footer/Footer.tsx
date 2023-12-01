import React from "react";

import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer(props: {
  children: any;
  colorScheme?: string;
  width?: string;
}) {
  return (
    <Box bg={"gray.800"} color={useColorModeValue("gray.700", "gray.200")}>
      <Container as={Stack} py={10} alignItems="center">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={20}>
          {React.Children.map(props.children, (child) => {
            if (
              child?.type?.displayName == "FooterItem" ||
              child?.type?.displayName == "FooterCategory"
            ) {
              return child;
            } else return null;
          })}
        </SimpleGrid>
      </Container>

      {React.Children.map(props.children, (child) => {
        if (child?.type?.displayName == "FooterFinalText") {
          return child;
        } else return null;
      })}
    </Box>
  );
}
