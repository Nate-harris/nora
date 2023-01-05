import React from "react";
import cx from "classnames";
import BlockContent from "../BlockContent";

const Freeform = ({ data }) => {
  const { maxWidth, textAlign, content } = data;

  return <BlockContent className={cx(maxWidth, textAlign)} blocks={content} />;
};

export default Freeform;
