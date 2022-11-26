import { motion, AnimateSharedLayout } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import Color from "./Color";

const Palette = ({ colors, width }) => {
  return (
    <div className="w-60 h-30 sm:w-160 sm:h-60 rounded-sm overflow-hidden">
      {colors.map(({ hex }) => (
        <Color key={hex} color={hex} width={width / colors.length} />
      ))}
    </div>
  );
};

export default Palette;
