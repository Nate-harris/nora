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
  hidden: { height: "auto", opacity: 0 },
  inactive: {
    height: 0,
    opacity: 0,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
  visible: {
    height: "auto",
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
  const src = imageUrlFor(templateImage).width(500);
  const [hovered, setHovered] = useState(false);
  console.log(active, noneSelected);
  return (
    <motion.div
      key={type}
      className={"relative"}
      variants={variants}
      initial={active || noneSelected ? "visible" : "inactive"}
      animate={active || noneSelected ? "visible" : "inactive"}
      whileHover={active ? "visible" : "hover"}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={src} alt={`Frame ${type}`} />
      <span
        className={cx(
          "absolute text-16 transition-all duration-300 font-delaGothicOne uppercase -translate-x-1/2 top-1/2 -translate-y-1/2 p-12 rounded-md",
          type === "Walnut" && "text-frameDarkBG bg-frameLightBG",
          type === "Red Oak" && "text-frameLightBG bg-frameDarkBG",
          (active || hovered) && "rotate-0",
          !(active || hovered) && "-rotate-90"
        )}
      >
        {type}
      </span>
    </motion.div>
  );
};
export default Frame;
