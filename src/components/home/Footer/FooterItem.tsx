import { Link } from "@chakra-ui/react";
import React from "react";

function FooterItem(props: { children: React.ReactNode; link: string }) {
  return <Link href={props.link}>{props.children}</Link>;
}
FooterItem.displayName = "FooterItem";
export default FooterItem;
