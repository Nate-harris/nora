import React from "react";
import DividerPhoto from "./DividerPhoto";
import GallerySection from "./GallerySection";
import Grid from "./Grid";

export const Module = ({ index, data }) => {
  if (!data) return null;
  const { _type } = data;
  switch (_type) {
    case "grid":
      return <Grid index={index} data={data} />;
    case "dividerPhoto":
      return <DividerPhoto index={index} data={data} />;
    case "gallerySection":
      return <GallerySection index={index} data={data} />;
    default:
      return null;
  }
};
