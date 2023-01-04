import React from "react";
import cx from "classnames";
import { blockSerializers } from "./BlockSerializers";
import { PortableText } from "@portabletext/react";

const Content = ({ blocks, className }) => {
  if (!blocks) return null;

  return (
    <div className={cx("rc", className)}>
      <PortableText value={blocks} components={blockSerializers} />
    </div>
  );
};

export default Content;
