import { Container, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function FooterFinalText(props: {
  children: React.ReactNode;
  credits?: { name: string; link: string }[];
}) {
  return (
    <Container
      maxW={"6xl"}
      py={4}
      borderStyle={"solid"}
      borderTopWidth={1}
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Text textAlign="center">
        {props.children}
        {props?.credits?.map((item, index) => {
          let ponto = ",";
          if (props.credits != undefined) {
            if (index == props.credits.length - 1) ponto = ".";
          }

          return (
            <>
              &nbsp;
              <u>
                <a href={item.link}>{item.name}</a>
              </u>
              {ponto}
            </>
          );
        })}
      </Text>
    </Container>
  );
}
FooterFinalText.displayName = "FooterFinalText";

export default FooterFinalText;
