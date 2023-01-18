import { motion, AnimateSharedLayout } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import cx from "classnames";
import { hexToRGB } from "@/utils/helpers";

const Color = ({ color, index, size = "lg" }) => {
  return (
    <motion.div
      style={{
        background: hexToRGB(color.hex, 0.9),
      }}
      className={cx(
        `palette--color`,
        size === "xs" && "is-extra-small",
        size === "sm" && "is-small"
      )}
    />
  );
};
export default Color;
