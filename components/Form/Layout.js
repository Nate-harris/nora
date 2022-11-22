import { motion, AnimatePresence } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";

const { className, styles } = css.resolve`
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  @media only screen and (max-width: 768px) {
    div {
    }
  }
`;

const variants = {
  initial: {
    opacity: 0,

    transition: FRAMER_TRANSITION_FASTEASE,
  },
  active: {
    opacity: 1,

    transition: FRAMER_TRANSITION_FASTEASE,
  },
  exit: {
    opacity: 0,

    transition: FRAMER_TRANSITION_FASTEASE,
  },
};

const Layout = ({ children, id }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`layout-${id}`}
        initial={"initial"}
        animate={"active"}
        exit={"exit"}
        variants={variants}
        className={className}
      >
        {children}
        {styles}
      </motion.div>
    </AnimatePresence>
  );
};

export default Layout;
