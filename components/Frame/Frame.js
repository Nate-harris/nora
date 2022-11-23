import { AnimatePresence, motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import imageUrlFor from "../../lib/sanity/imageUrlFor";
import cx from "classnames";
import { useState } from "react";
import { formatCurrencyString } from "use-shopping-cart";
import Photo from "../Photo";
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
    scale: 0.95,
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
  const src = imageUrlFor(templateImage).width(1080);
  const [hovered, setHovered] = useState(false);
  console.log(templateImage);
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
      <Photo
        className={` w-xl pb-[${templateImage.aspectRatio * 100}%]`}
        photo={templateImage}
        alt={`Frame ${type}`}
      />
      <span
        className={cx(
          "absolute text-12 transition-all duration-300 shadow-md -rotate-90 top-1/2 -translate-y-1/2 p-12 px-48 rounded-full",
          type === "Walnut" && "text-white bg-orange",
          type === "Red Oak" && "text-white bg-orange",
          (active || hovered) && "opacity-100 -translate-x-3/4",
          !(active || hovered) && "opacity-0 -translate-x-0"
        )}
      >
        {type}
      </span>
    </motion.div>
  );
};
export default Frame;
