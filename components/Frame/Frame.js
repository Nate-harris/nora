import { AnimatePresence, motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import imageUrlFor from "../../lib/sanity/imageUrlFor";
import cx from "classnames";
import { useState } from "react";
import { formatCurrencyString } from "use-shopping-cart";
const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
  hover: {
    scale: 0.99,
  },
};

const Frame = ({
  type,
  active,
  noneSelected,
  price,
  templateImage,
  onClick,
}) => {
  const src = imageUrlFor(templateImage).width(400);
  const [hovered, setHovered] = useState(false);
  return (
    <AnimatePresence mode="popLayout">
      {(active || noneSelected) && (
        <motion.div
          key={type}
          layout
          layoutId={type}
          className={"relative"}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover={active ? "visible" : "hover"}
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={src} alt={`Frame ${type}`} />
          <span
            className={cx(
              "absolute text-12 transition-all duration-300 font-delaGothicOne uppercase -translate-x-1/2 top-1/2 -translate-y-1/2 p-12 rounded-md",
              type === "Walnut" && "text-frameDarkBG bg-frameLightBG",
              type === "Red Oak" && "text-frameLightBG bg-frameDarkBG",
              (active || hovered) && "rotate-0",
              !(active || hovered) && "-rotate-90"
            )}
          >
            {type}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Frame;
