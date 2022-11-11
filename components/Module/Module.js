import React from "react";

import Grid from "./grid";

export const Module = ({ index, data }) => {
  if (!data) return null;
  const { _type } = data;
  switch (_type) {
    case "grid":
      return <Grid index={index} data={data} />;
    default:
      return null;
  }
};
