import React from "react";

import Grid from "./grid";

export const Module = ({ index, data }) => {
  const ModuleType = {
    grid: Grid,
  }[data?._type] ?? <></>;

  return <ModuleType index={index} data={data} />;
};
