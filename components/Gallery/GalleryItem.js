import React from "react";

import Photo from "../Photo";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import { useState } from "react";
import { useIsSmall } from "../../utils/useMediaQueries";
import Palette from "@/components/ReviewCommission/Palette";
const MotionPhoto = motion(Photo);

const overlayVariants = {
  open: {
    height: 0,
  },
  closed: {
    height: "100%",
  },
};

function useParallax(value, distance) {
  return useTransform(value, [0, 0.5, 1], [0, -distance, 0]);
}

const GalleryPhoto = ({ photo, scrollYProgress }) => {
  const isSmall = useIsSmall();
  const x = useParallax(scrollYProgress, isSmall ? 0 : -150);
  const xSpring = useSpring(x, { damping: 20, stiffness: 100 });
  return (
    <motion.div className="gallery-item--image" style={{ x: xSpring }}>
      <Photo photo={photo} />
    </motion.div>
  );
};
const GalleryInformation = ({ name, frame, colors, scrollYProgress }) => {
  const x = useParallax(scrollYProgress, -100);
  const xSpring = useSpring(x, { damping: 20, stiffness: 80 });
  return (
    <motion.div className="gallery-item--information">
      <details>
        <summary>Information</summary>
        <div className="flex flex-col gap-6 mt-12">
          <div>
            <label>Name</label>
            {name}
          </div>
          {frame && (
            <div>
              <label>Frame</label>
              {frame.type}
            </div>
          )}
        </div>
      </details>
    </motion.div>
  );
};
const GalleryItem = ({ data = {} }) => {
  const { name, frame, colors, photo } = data;

  const isSmall = useIsSmall();
  const [hovered, setHovered] = useState(false);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  if (!photo) return null;

  return (
    <section
      ref={ref}
      className="gallery-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GalleryInformation
        name={name}
        frame={frame}
        colors={colors}
        scrollYProgress={scrollYProgress}
      />
      <GalleryPhoto photo={photo} scrollYProgress={scrollYProgress} />
    </section>
  );
};

export default GalleryItem;
