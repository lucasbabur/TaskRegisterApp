import { Stack, Text } from "@chakra-ui/react";
import React from "react";

function FooterCategory(props: { children: React.ReactNode; title: string }) {
  return (
    <>
      <Stack>
        <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
          {props.title}
        </Text>
        {props.children}
      </Stack>
    </>
  );
}
FooterCategory.displayName = "FooterCategory";

export default FooterCategory;
