import React from "react";
import styled, { css } from "styled-components";

const Logo = ({ projectName }) => {
  return (
    <Icon isLogin={projectName}>
      <div>NORA</div>
    </Icon>
  );
};

const Icon = styled.div`
  display: block;
  width: auto;
  height: 100%;
  width: 12em;
  max-width: 100%;

  font-family: "Dela Gothic One", cursive;
  color: white;
  font-size: 2rem;
  ${(props) =>
    props.isLogin &&
    css`
      display: block;
      margin: 0 auto;
      height: 4em;

      color: black;
    `}
  svg {
    display: block;
    margin: 0 auto;
    height: 12em;
    width: auto;
    fill: currentColor;
  }
`;

export default Logo;
