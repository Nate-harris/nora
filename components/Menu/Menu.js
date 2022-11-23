import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { animate, motion, useMotionValue } from "framer-motion";
import { observer } from "mobx-react-lite";
import {
  FRAMER_TRANSITION_EASEOUT,
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

const shaderVariants = {
  active: {
    alpha: 1.0,
    color: "rgb(242, 121, 34)",
    scale: 10.0,
  },
  inactive: {
    alpha: 0.2,
    color: "rgb(255,255,255)",
    scale: 5.0,
  },
};

const Menu = observer(({ items, hasFocus = true, onClick, ...rest }) => {
  const { menuOpen } = useUIStore();
  const [itemHovered, setItemHovered] = useState(false);

  const alpha = useMotionValue(0.25);
  const shaderColor = useMotionValue("rgb(255, 255, 255)");
  const scale = useMotionValue(5.0);

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

  useEffect(() => {
    if (itemHovered) {
      animate(alpha, shaderVariants.active.alpha, FRAMER_TRANSITION_FASTEREASE);
      animate(
        shaderColor,
        shaderVariants.active.color,
        FRAMER_TRANSITION_FASTEREASE
      );
      animate(scale, shaderVariants.active.scale, {
        type: "spring",
        damping: 40,
        stiffness: 100,
      });
    } else {
      animate(
        alpha,
        shaderVariants.inactive.alpha,
        FRAMER_TRANSITION_FASTEREASE
      );
      animate(
        shaderColor,
        shaderVariants.inactive.color,
        FRAMER_TRANSITION_FASTEREASE
      );

      animate(scale, shaderVariants.inactive.scale, {
        type: "spring",
        damping: 40,
        stiffness: 100,
      });
    }
  }, [itemHovered, alpha, shaderColor, scale]);

  return (
    <motion.nav
      initial="hidden"
      animate={menuOpen ? "visible" : "hidden"}
      variants={containerVariants}
      className="menu"
    >
      <WoodgrainShaderSketch
        className="menu--overlay"
        width={width}
        height={height}
        color={shaderColor}
        scale={scale}
        alpha={alpha}
        offset={{ current: { x: 2.0, y: 1.5 } }}
      />

      <ul {...rest} className="menu--container">
        {menuOpen &&
          items?.map((item, index) => {
            return (
              <CustomLink
                key={index}
                tabIndex={!hasFocus ? -1 : null}
                link={{ ...item, title: null }}
                onClick={onClick}
              >
                <motion.li
                  custom={{
                    hasDelay,
                    direction: index % 2 === 0 ? 1 : -1,
                    offset: index,
                  }}
                  onMouseEnter={() => setItemHovered(true)}
                  onMouseLeave={() => setItemHovered(false)}
                  whileHover={"hover"}
                  initial="hidden"
                  animate="visible"
                  variants={listItemVariants}
                  className="menu--item"
                >
                  {item.title}
                </motion.li>
              </CustomLink>
            );
          })}
      </ul>
    </motion.nav>
  );
});

export default Menu;
