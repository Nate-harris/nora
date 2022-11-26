import { useInView } from "framer-motion";
import React from "react";
import { useRef } from "react";

import Photo from "../Photo";
import GalleryItem from "./GalleryItem";
import { motion } from "framer-motion";

const GallerySection = ({ data = {} }) => {
  const { content } = data;
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: true });
  return (
    <>
      <div ref={sectionRef} className="gallery-section">
        {content.map((item, index) => {
          return <GalleryItem key={index} data={item} />;
        })}
      </div>
    </>
  );
};

export default GallerySection;
