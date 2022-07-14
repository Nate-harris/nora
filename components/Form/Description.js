import { PortableText } from "@portabletext/react";

import css from "styled-jsx/css";

const { className, styles } = css.resolve`
  div {
    font-family: var(--font-family-heading);
    text-align: center;
    text-transform: uppercase;
    font-size: 2rem;
    line-height: 1.8rem;
  }
  @media only screen and (max-width: 768px) {
    div {
    }
  }
`;

export default ({ value }) => {
  return (
    <div className={className}>
      <PortableText value={value} />
      {styles}
    </div>
  );
};
