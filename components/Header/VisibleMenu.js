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
import { useCookies } from "react-cookie";
import { useIsSmall } from "@/utils/useMediaQueries";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "@/lib/framer/animations";

const VisibleMenu = observer(({ data = {}, isHome }) => {
  const { menuOpen } = useUIStore();
  const isSmall = useIsSmall();
  const scrollDirection = useScrollDirection();
  const [cookie, setCookie] = useCookies(["nora"]);
  const [orderStarted, setOrderStarted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (cookie.nora) {
        setOrderStarted(true);
      } else {
        setOrderStarted(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (!data) return null;
  return (
    <m.nav
      animate={{
        opacity: menuOpen ? 0 : 1,
        y: isSmall ? 0 : menuOpen || scrollDirection === "down" ? "-250%" : "0",
      }}
      transition={FRAMER_TRANSITION_FASTEASE}
      className="fixed bottom-36 right-24 z-1 sm:bottom-auto sm:top-26 sm:right-100 backdrop-blur-xl "
    >
      {data.items.map((item, index) => {
        return (
          <CustomLink
            key={index}
            className={cx(
              "text-inherit block underline px-16 py-12 rounded-md pointer-events-auto transition-colors border border-transparent hover:border-white text-14",
              item.page.isOrder && "has-indicator",
              orderStarted && "is-active"
            )}
            link={{ ...item, title: null }}
          >
            {item.title}
          </CustomLink>
        );
      })}
    </m.nav>
  );
});

export default VisibleMenu;
