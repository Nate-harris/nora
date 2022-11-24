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
      <motion.div
        animate={{ y: inView ? 0 : 100 }}
        className="hidden md:flex z-5 fixed bottom-0 right-0 left-0 justify-center"
      >
        <div
          className={`shadow-md my-38 py-8 pr-24 bg-orange text-pageBG rounded-3xl flex items-center before:content-['?'] before:text-12 before:shadow-md before:bg-white before:text-brown before:h-28 before:w-48 before:flex before:items-center before:justify-center before:rounded-full before:mx-12 before:mr-16`}
        >
          Hover to reveal each nora puzzle
        </div>
      </motion.div>
    </>
  );
};

export default GallerySection;
