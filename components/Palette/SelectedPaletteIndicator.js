import { motion, AnimateSharedLayout } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";

const { className, styles } = css.resolve`
  div {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 4px solid white;
  }
  @media only screen and (max-width: 768px) {
    div {
    }
  }
`;

const SelectedPaletteIndicator = () => {
  return (
    <>
      <motion.div
        className={className}
        layoutId="outline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={FRAMER_TRANSITION_FASTEASE}
      />
      {styles}
    </>
  );
};

export default SelectedPaletteIndicator;
