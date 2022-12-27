import { motion } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
  FRAMER_TRANSITION_FASTEREASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import cx from "classnames";
import { useCallback, useState } from "react";

const FRAME_COLORS = {
  LIGHT: "light",
  DARK: "dark",
};



const Palette = ({
  active,
  noneSelected,
  name,
  colors,
  index,
  total,
  last,
  onClick,
}) => {
  const isLastInOdd = last && total % 2 !== 0;

  return (
    <motion.div
      layout
      key={`palette-${name}`}
      custom={{
        index,
        direction: isLastInOdd ? 0 : index % 2 === 0 ? 1 : -1,
      }}
      style={{ pointerEvents: !active && !noneSelected ? "none" : "auto" }}
      initial={active ? "active" : noneSelected ? "hidden" : "inactive"}
      animate={active ? "active" : noneSelected ? "visible" : "inactive"}
      variants={containerVariants}
      className="mx-auto w-full md:w-2xl overflow-hidden"
      value={name}
      onClick={onClick}
    >
      <SVG
        colors={colors}
        active={active}
        frameColor={index % 2 === 0 ? FRAME_COLORS.DARK : FRAME_COLORS.LIGHT}
      />
    </motion.div>
  );
};

export default Palette;
