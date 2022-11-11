import React from "react";
import cx from "classnames";
import { blockSerializers } from "./BlockSerializers";
import { PortableText } from "@portabletext/react";

const Content = ({ blocks, className }) => {
  if (!blocks) return null;
  return <PortableText value={blocks} components={blockSerializers} />;
};

export default Content;
