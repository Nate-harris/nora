import React from "react";
import DividerPhoto from "./DividerPhoto";
import GallerySection from "./GallerySection";
import Grid from "./Grid";
import Marquee from "./Marquee";
import Hero from "./Hero";

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
    case "marquee":
      return <Marquee index={index} data={data} />;
    case "hero":
      return <Hero index={index} data={data} />;
    default:
      return null;
  }
};
