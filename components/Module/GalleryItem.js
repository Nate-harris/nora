import React from "react";

import Photo from "../Photo";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import { useState } from "react";
import { useIsSmall } from "../../utils/useMediaQueries";

const overlayVariants = {
  open: {
    height: 0,
  },
  closed: {
    height: "100%",
  },
};

const GalleryItem = ({ data = {} }) => {
  const { name, photo, borderColor, panelColor, textColor, includeReveal } =
    data;
  const isSmall = useIsSmall();
  const [hovered, setHovered] = useState(false);
  const itemRef = useRef();
  const inView = useInView(itemRef, { once: true });

  if (!photo) return null;

  return (
    <div
      ref={itemRef}
      style={{ backgroundColor: borderColor.hex }}
      className="gallery-section--item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="gallery-section--item-overlay">
        {includeReveal && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate={(isSmall ? inView : hovered) ? "open" : "closed"}
            transition={{
              ...FRAMER_TRANSITION_FASTEASE,
              delay: isSmall ? 1.2 : 0,
            }}
            style={{ backgroundColor: panelColor.hex, color: textColor.hex }}
            className="gallery-section--label"
          >
            <span className="gallery-section--name">{name}</span>
          </motion.div>
        )}
      </div>
      <Photo photo={photo} width={1600} srcSizes={[800, 1000, 1200, 1600]} />
    </div>
  );
};

export default GalleryItem;
