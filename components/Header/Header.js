import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cx from "classnames";
import { useUIStore } from "../../providers/RootStoreProvider";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import Menu from "../Menu/Menu";

const hamburgerTopLineVariants = {
  open: {
    rotate: -45,
    y: 25.5,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  closed: {
    rotate: 0,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
const hamburgerMiddleLineVariants = {
  open: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
const hamburgerBottomLineVariants = {
  open: {
    rotate: 45,
    y: -25.5,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  closed: {
    rotate: 0,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const ICON_PATHS = [
  {
    id: "n",

    d: "M29.46,.77c-.16,3.96-.25,8.19-.25,12.71s.08,8.79,.25,12.74h-12.57L8.39,7.06l.63,19.17H0c.19-4.54,.28-8.79,.28-12.74S.19,5.31,0,.77H12.92l8.53,19.7L20.85,.77h8.6Z",
  },
  {
    id: "o",

    d: "M36.06,23.08c-2.53-2.33-3.79-5.6-3.79-9.81s1.26-7.42,3.77-9.76c2.52-2.34,6.47-3.51,11.85-3.51s9.37,1.17,11.88,3.51c2.52,2.34,3.77,5.59,3.77,9.76s-1.25,7.51-3.76,9.83c-2.5,2.32-6.47,3.48-11.9,3.48s-9.3-1.16-11.83-3.49Zm17.45-5.16c1.15-.99,1.72-2.54,1.72-4.65s-.57-3.59-1.72-4.6c-1.15-1.01-3.02-1.51-5.62-1.51s-4.44,.5-5.58,1.51c-1.15,1.01-1.72,2.54-1.72,4.6s.57,3.63,1.72,4.63c1.15,1.01,3.01,1.51,5.58,1.51s4.47-.5,5.62-1.49Z",
  },
  {
    id: "r",

    d: "M93.05,14.39c-1,1.4-2.7,2.42-5.11,3.05,.28,.37,.48,.67,.6,.88l5.69,7.9h-9.55c-1.03-1.92-2.66-4.63-4.88-8.15h-5.16v8.15h-8.29c.19-4.54,.28-8.79,.28-12.74s-.09-8.2-.28-12.74h8.29v.04h7.2c4.73,0,8.03,.76,9.9,2.28,1.87,1.52,2.81,3.58,2.81,6.18,0,2.04-.5,3.76-1.49,5.16Zm-18.41-6.88v4h4.74c1.99,0,3.49-.06,4.51-.19,1.02-.13,1.73-.33,2.12-.61s.6-.69,.6-1.23-.19-.91-.56-1.19c-.37-.28-1.08-.48-2.11-.6-1.03-.12-2.55-.18-4.56-.18h-4.74Z",
  },
  {
    id: "a",

    d: "M117.4,26.23c-.44-1.33-1.04-3.01-1.79-5.02h-11.2l-1.76,5.02h-8.81L103.67,.74h12.92l9.9,25.49h-9.09Zm-3.79-10.5c-.89-2.46-1.8-4.92-2.74-7.37l-.84-2.28c-.82,2.13-2.02,5.35-3.62,9.65h7.2Z",
  },
];
const Icon = observer(({ isOrderPage }) => {
  const { menuOpen } = useUIStore();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <Link href="/">
      {/*calc(50vw - 12rem + 3.2rem)*/}
      <motion.a
        className="pointer-events-auto justify-self-center self-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <svg
          className="w-120"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 126.49 26.58"
        >
          <g
            className="transition-all duration-300 ease-in-out"
            style={{
              fill:
                menuOpen || !isOrderPage ? "var(--white)" : "var(--headerText)",
            }}
          >
            {ICON_PATHS.map((path, index) => (
              <motion.path
                key={path.id}
                animate={{ scale: hovered ? 0.8 : 1 }}
                transition={{ delay: 0.05 * index }}
                d={path.d}
              />
            ))}
          </g>
        </svg>
      </motion.a>
    </Link>
  );
});

const Hamburger = observer(({ isOrderPage, onClick }) => {
  const { menuOpen, toggleMenuOpen } = useUIStore();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="bg-transparent w-48 pointer-events-auto"
      type="button"
      onClick={toggleMenuOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 89 64"
        overflow="visible"
      >
        <g
          className="transition-all duration-300 ease-in-out"
          style={{
            fill:
              menuOpen || !isOrderPage ? "var(--white)" : "var(--headerText)",
          }}
        >
          <motion.g
            animate={{ scale: !menuOpen && hovered ? 0.9 : 1 }}
            transition={{ delay: 0 }}
          >
            <motion.path
              animate={menuOpen ? "open" : "closed"}
              variants={hamburgerTopLineVariants}
              d="M5.13,.11c-1.05,.2-2.41,.94-3.21,1.74C-1.48,5.28-.19,10.81,4.42,12.52l.71,.26,38.86,.04c27.76,.03,39.1,0,39.69-.1,1.21-.2,2.54-.9,3.4-1.76,3.4-3.43,2.1-8.96-2.5-10.67l-.71-.26L44.81,0C20.56,0,5.52,.03,5.13,.11Z"
            />
          </motion.g>
          <motion.g
            animate={{ scale: !menuOpen && hovered ? 0.9 : 1 }}
            transition={{ delay: 0.05 }}
          >
            <motion.path
              animate={menuOpen ? "open" : "closed"}
              variants={hamburgerMiddleLineVariants}
              d="M4.43,25.9C1.31,26.97-.52,30.12,.13,33.29c.46,2.2,2.23,4.15,4.4,4.83,.81,.25,1.27,.25,39.97,.25s39.16,0,39.97-.25c2.63-.82,4.54-3.39,4.54-6.13s-1.9-5.31-4.54-6.13c-.81-.25-1.27-.25-40.01-.25H5.25l-.83,.29Z"
            />
          </motion.g>
          <motion.g
            animate={{ scale: !menuOpen && hovered ? 0.9 : 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.path
              animate={menuOpen ? "open" : "closed"}
              variants={hamburgerBottomLineVariants}
              d="M5.13,51.28c-1.05,.2-2.41,.94-3.21,1.74-3.4,3.43-2.1,8.96,2.5,10.67l.71,.26,38.86,.04c27.76,.03,39.1,0,39.69-.1,1.21-.21,2.54-.9,3.4-1.76,3.4-3.43,2.1-8.96-2.5-10.67l-.71-.26-39.05-.02c-24.26-.01-39.29,.03-39.69,.1Z"
            />
          </motion.g>
        </g>
      </svg>
    </button>
  );
});

const Header = ({ data = {}, isOrderPage }) => {
  return (
    <>
      <Menu items={data.menu.items} />
      <header
        className={cx(
          "fixed top-0 right-0 left-0 z-10 p-32 flex justify-between pointer-events-none"
        )}
      >
        <Icon isOrderPage={isOrderPage} />
        <Hamburger isOrderPage={isOrderPage} />
      </header>
    </>
  );
};

export default Header;
