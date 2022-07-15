import { motion } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
const { className, styles } = css.resolve`
  button {
    box-shadow: 0 0 6px rgb(0 0 0 / 12%);
    color: var(--black);
    background-color: var(--white);
    border-radius: var(--radius-s);
    border: 0;
    outline: 0;
    padding: var(--spacing-m);
    font-family: var(--font-family-sans-serif);
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    button {
    }
  }
`;

const variants = {
  hover: {
    fontVariationSettings: '"slnt" -10',
    transition: FRAMER_TRANSITION_FASTEASE,
  },
  tap: {
    y: 5,
    fontVariationSettings: '"slnt" 0',
    transition: FRAMER_TRANSITION_FASTEASE,
  },
};

export default observer(({ onClick, label, type, ...props }) => {
  return (
    <>
      <motion.button
        variants={variants}
        whileHover={"hover"}
        whileTap={"tap"}
        className={className}
        onClick={onClick}
        {...props}
      >
        {label}
      </motion.button>
      {styles}
    </>
  );
});
