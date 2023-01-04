import { useInView } from "framer-motion";
import React from "react";
import { useRef } from "react";

import Photo from "../Photo";
import GalleryItem from "@/components/Gallery/GalleryItem";
import { motion } from "framer-motion";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const GallerySection = ({ data = {} }) => {
  const { content } = data;
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: true });
  return (
    <>
      <section ref={sectionRef} className="section gallery-section">
        {content.map((item, index) => {
          return <GalleryItem key={index} data={item} />;
        })}
      </section>
      <div className="fixed w-200 right-0 top-0 bottom-0 flex items-center">
        <ThemeSwitcher />
      </div>
    </>
  );
};

export default GallerySection;
