import { observer } from "mobx-react-lite";
import {
  AnimateSharedLayout,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import cx from "classnames";
import { useUIStore } from "../../providers/RootStoreProvider";
import { useRect } from "@reach/rect";
import { useState, useRef, useEffect } from "react";
import { useIsSmall } from "../../utils/useMediaQueries";
import { useRouter } from "next/router";

const Information = observer(({ label }) => {
  const { showModal } = useUIStore();

  const handleClick = (e) => {
    e.preventDefault();
    showModal(true);
  };

  return (
    <li className={cx("status-bar--item", "is-information")}>
      <button onClick={handleClick}>{label}</button>
    </li>
  );
});

export default Information;
