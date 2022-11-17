import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import cx from "classnames";

import Photo from "./Photo";
import CustomLink from "./CustomLink";
const hasButton = true;
export const blockSerializers = {
  block: {
    // build our mock header styles
    h1mock: ({ children }) => {
      return <p className={cx("is-h1")}>{children}</p>;
    },

    h2mock: ({ children }) => {
      return <p className={cx("is-h2")}>{children}</p>;
    },

    h3mock: ({ children }) => {
      return <p className={cx("is-h3")}>{children}</p>;
    },

    h4mock: ({ children }) => {
      return <p className={cx("is-h4")}>{children}</p>;
    },
  },
  types: {
    photo: ({ value }) => {
      return <Photo photo={value} />;
    },
    horizontalRule: () => <hr />,
  },
  marks: {
    link: ({ text, value, ...props }) => {
      return <CustomLink link={{ ...value, title: text }} />;
    },
  },
};
