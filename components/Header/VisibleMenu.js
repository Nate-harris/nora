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

const VisibleMenu = observer(({ data = {}, isHome }) => {
  const { menuOpen } = useUIStore();
  const scrollDirection = useScrollDirection();
  const [cookie, setCookie] = useCookies(["nora"]);
  const [orderStarted, setOrderStarted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      console.log("cookie", cookie);
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
        y: menuOpen || scrollDirection === "down" ? "-250%" : "0",
      }}
      className="hidden sm:flex gap-16 items-center -ml-64 text-14 backdrop-blur-xl px-16 rounded-md pointer-events-auto"
    >
      {data.items.map((item, index) => {
        return (
          <CustomLink
            key={index}
            className={cx(
              "underline hover:opacity-50",
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
