import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import {
  FRAMER_TRANSITION_FASTEASE,
  FRAMER_TRANSITION_FASTEREASE,
} from "../../lib/framer/animations";
import { useUIStore } from "../../providers/RootStoreProvider";
import CustomLink from "../CustomLink/CustomLink";
import dynamic from "next/dynamic";
import { useWindowSize } from "../../utils/helpers";
import { useEffect } from "react";
import { useState } from "react";
const WoodgrainShaderSketch = dynamic(
  () => import("../WoodgrainShaderSketch"),
  { ssr: false }
);

const containerVariants = {
  visible: {
    height: "100%",
    transition: FRAMER_TRANSITION_FASTEASE,
  },
  hidden: {
    height: 0,
    transition: FRAMER_TRANSITION_FASTEREASE,
  },
};

const INITIAL_DELAY = 0.3;
const ITEM_STAGGER = 0.15;
const listItemVariants = {
  visible: ({ hasDelay, direction, offset }) => ({
    opacity: 1,
    rotate: direction * 3,
    y: 0,
    transition: {
      delay: hasDelay ? offset * ITEM_STAGGER + INITIAL_DELAY : 0,
    },
  }),
  hover: {
    opacity: 1,
    rotate: 0,
    y: 0,
  },
  hidden: {
    opacity: 0,
    rotate: 0,
    y: -12,
  },
};

const Menu = observer(({ items, hasFocus = true, onClick, ...rest }) => {
  const { menuOpen } = useUIStore();
  const [hasDelay, setHasDelay] = useState(true);
  const { width, height } = useWindowSize();

  // Don't want the delay for our hover animation so remove it once
  // we have opened the menu
  useEffect(() => {
    if (menuOpen) {
      setTimeout(() => {
        setHasDelay(false);
      }, items.length * ITEM_STAGGER + INITIAL_DELAY);
    } else {
      setHasDelay(true);
    }
  }, [menuOpen, items.length]);

  return (
    <motion.nav
      initial="hidden"
      animate={menuOpen ? "visible" : "hidden"}
      variants={containerVariants}
      className="fixed left-0 right-0 top-0 bottom-0 z-10 bg-purple flex justify-center items-center overflow-hidden"
    >
      <WoodgrainShaderSketch
        className={"absolute top-0 left-0 right-0 bottom-0 -z-1"}
        color={"#f2dcb5"}
        alpha={220}
        width={width}
        height={height}
      />

      <ul {...rest} className="flex flex-col gap-y-48">
        {menuOpen &&
          items?.map((item, index) => {
            return (
              <motion.li
                key={index}
                custom={{
                  hasDelay,
                  direction: index % 2 === 0 ? 1 : -1,
                  offset: index,
                }}
                whileHover={"hover"}
                initial="hidden"
                animate="visible"
                variants={listItemVariants}
                className="text-64 font-delaGothicOne text-center uppercase text-white border-16 px-16 py-8 pb-16 border-white"
              >
                <CustomLink
                  tabIndex={!hasFocus ? -1 : null}
                  link={item}
                  onClick={onClick}
                />
              </motion.li>
            );
          })}
      </ul>
    </motion.nav>
  );
});

export default Menu;
