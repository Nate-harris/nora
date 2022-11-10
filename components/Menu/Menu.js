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
const listItemVariants = {
  visible: ({ direction, offset }) => ({
    opacity: 1,
    rotate: direction * 3,
    y: 0,
    transition: {
      delay: offset * 0.15 + 0.3,
    },
  }),
  hidden: {
    opacity: 0,
    rotate: 0,
    y: -12,
  },
};

const Menu = observer(({ items, hasFocus = true, onClick, ...rest }) => {
  const { menuOpen } = useUIStore();
  return (
    <motion.nav
      initial="hidden"
      animate={menuOpen ? "visible" : "hidden"}
      variants={containerVariants}
      className="fixed left-0 right-0 top-0 bottom-0 z-10 bg-purple flex justify-center items-center"
    >
      <ul {...rest} className="flex flex-col gap-y-48">
        {menuOpen &&
          items?.map((item, index) => {
            return (
              <motion.li
                key={index}
                custom={{ direction: index % 2 === 0 ? 1 : -1, offset: index }}
                initial="hidden"
                animate="visible"
                variants={listItemVariants}
                className="text-64 font-delaGothicOne text-center uppercase text-white border-16 px-16 py-8 pb-16 border-white"
              >
                <Link href={item.href} passHref>
                  <a>{item.label}</a>
                </Link>
              </motion.li>
            );
          })}
      </ul>
    </motion.nav>
  );
});

export default Menu;
