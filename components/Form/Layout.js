import { motion, AnimatePresence } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";

const Layout = ({ children, id }) => {
  const key = `layout-${id}`;

  return <AnimatePresence mode="popLayout">{children}</AnimatePresence>;
};

export default Layout;
