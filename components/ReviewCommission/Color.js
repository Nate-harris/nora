import { motion, AnimateSharedLayout } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";

const Color = ({ color, width }) => {
  return (
    <div
      style={{ background: color }}
      className={`inline-block h-30 w-15 sm:h-60 sm:w-40`}
    />
  );
};
export default Color;
