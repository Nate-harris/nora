import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import cx from "classnames";

import Photo from "./Photo";
import CustomLink from "./CustomLink";
import Balancer from "react-wrap-balancer";

const hasButton = true;
export const blockSerializers = {
  block: {
    h1: ({ children }) => {
      return (
        <h1>
          <Balancer>{children}</Balancer>
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h2>
          <Balancer>{children}</Balancer>
        </h2>
      );
    },
    h3: ({ children }) => {
      return (
        <h3>
          <Balancer>{children}</Balancer>
        </h3>
      );
    },
    h4: ({ children }) => {
      return (
        <h4>
          <Balancer>{children}</Balancer>
        </h4>
      );
    },
    h5: ({ children }) => {
      return (
        <h5>
          <Balancer>{children}</Balancer>
        </h5>
      );
    },
    h6: ({ children }) => {
      return (
        <h6>
          <Balancer>{children}</Balancer>
        </h6>
      );
    },
    // build our mock header styles
    h1mock: ({ children }) => {
      return (
        <p className={cx("is-h1")}>
          <Balancer>{children}</Balancer>
        </p>
      );
    },

    h2mock: ({ children }) => {
      return (
        <p className={cx("is-h2")}>
          <Balancer>{children}</Balancer>
        </p>
      );
    },

    h3mock: ({ children }) => {
      return (
        <p className={cx("is-h3")}>
          <Balancer>{children}</Balancer>
        </p>
      );
    },

    h4mock: ({ children }) => {
      return (
        <p className={cx("is-h4")}>
          <Balancer>{children}</Balancer>
        </p>
      );
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
