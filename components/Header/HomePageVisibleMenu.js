import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cx from "classnames";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import { observer } from "mobx-react-lite";
import { motion, m, useInView, useViewportScroll } from "framer-motion";
import Menu from "../Menu/Menu";
import { useRect } from "@reach/rect";
import CustomLink from "../CustomLink/CustomLink";
import { useScrollDirection } from "@/utils/helpers";

const HomePageVisibleMenu = observer(({ data = {}, isHome }) => {
  const { menuOpen } = useUIStore();
  const scrollDirection = useScrollDirection();
  if (!data) return null;
  return (
    <m.nav
      animate={{
        y: menuOpen || scrollDirection === "down" ? "-250%" : "0",
      }}
      className="hidden sm:flex gap-16 items-center -ml-64 text-14 backdrop-blur-xl px-16 rounded-md pointer-events-auto"
    >
      {data.items.map((item, index) => {
        return (
          <CustomLink
            key={index}
            className="underline hover:opacity-50"
            link={{ ...item, title: null }}
          >
            {item.title}
          </CustomLink>
        );
      })}
    </m.nav>
  );
});

export default HomePageVisibleMenu;
