import { motion, AnimateSharedLayout } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import Color from "./Color";
import cx from "classnames";

const Palette = ({ colors, width, size = "large" }) => {
  return (
    <div className={cx("palette", size === "small" && "is-small")}>
      {colors.map((color, index) => (
        <Color key={color} color={color} index={index} size={size} />
      ))}
    </div>
  );
};

export default Palette;
