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
import { memo } from "react";
import cx from "classnames";
const WoodgrainShaderSketch = dynamic(
  () => import("../WoodgrainShaderSketch"),
  { loading: () => "", ssr: false }
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
    transition: FRAMER_TRANSITION_FASTEASE,
  },
};

const COLOR_COMBINATIONS = [
  // Purple
  {
    background: "rgb(170, 164, 208)",
    shader: "rgb(242, 121, 34)",
  },
  // Green
  {
    background: "rgb(123, 183, 150)",
    shader: "rgb(252, 154, 122)",
  },
  // Blue
  {
    background: "rgb(203, 188, 154)",
    shader: "rgb(239, 184, 87)",
  },
  // Beige
  {
    background: "rgb(120, 190, 227)",
    shader: "rgb(123, 183, 150)",
  },
];

const Menu = observer(({ items, hasFocus = true, onClick, ...rest }) => {
  const { menuOpen, toggleMenuOpen } = useUIStore();
  const [itemHovered, setItemHovered] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

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

      // Every time menu is closed, wait for exit then cycle to next available color
      setTimeout(() => {
        setColorIndex((prev) => (prev + 1) % COLOR_COMBINATIONS.length);
      }, (FRAMER_TRANSITION_FASTEASE.delay + FRAMER_TRANSITION_FASTEASE.duration) * 1000);
    }
  }, [menuOpen, items.length]);

  const shaderVariants = {
    active: {
      alpha: 1.0,
      color: COLOR_COMBINATIONS[colorIndex].shader,
      scale: 6.0,
    },
    inactive: {
      alpha: 0.4,
      color: "rgb(255, 255, 255)",
      scale: 7.0,
    },
  };

  useEffect(() => {
    if (itemHovered) {
      animate(alpha, shaderVariants.active.alpha, {
        type: "tween",
        ease: "easeInOut",
        duration: 0.9,
      });
      animate(shaderColor, shaderVariants.active.color, {
        type: "tween",
        ease: "easeInOut",
        duration: 0.9,
      });
      animate(scale, shaderVariants.active.scale, {
        ease: "easeInOut",
        duration: 1.4,
      });
    } else {
      animate(alpha, shaderVariants.inactive.alpha, {
        type: "tween",
        ease: "easeInOut",
        duration: 1,
      });
      animate(shaderColor, shaderVariants.inactive.color, {
        type: "tween",
        ease: "easeInOut",
        duration: 1,
      });
      animate(scale, shaderVariants.inactive.scale, {
        ease: "easeInOut",
        duration: 1.2,
      });
    }
  }, [
    itemHovered,
    alpha,
    shaderColor,
    scale,
    shaderVariants.active.alpha,
    shaderVariants.active.color,
    shaderVariants.active.scale,
    shaderVariants.inactive.alpha,
    shaderVariants.inactive.color,
    shaderVariants.inactive.scale,
  ]);

  return (
    <motion.nav
      style={{ background: COLOR_COMBINATIONS[colorIndex].background }}
      initial="hidden"
      animate={menuOpen ? "visible" : "hidden"}
      variants={containerVariants}
      className="menu"
    >
      <div className={cx("menu--overlay")}>
        <WoodgrainShaderSketch
          width={width}
          height={height}
          color={shaderColor}
          scale={scale}
          alpha={alpha}
          offset={{ current: { x: 8.0, y: 5 } }}
        />
      </div>

      <ul {...rest} className="menu--container">
        {items?.map((item, index) => {
          return (
            <CustomLink
              key={index}
              tabIndex={!hasFocus ? -1 : null}
              link={{ ...item, title: null }}
              onClick={() => {
                toggleMenuOpen();
                if (onClick) {
                  onClick();
                }
              }}
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
                animate={menuOpen ? "visible" : "hidden"}
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

export default memo(Menu);
