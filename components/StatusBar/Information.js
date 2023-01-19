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
  const { showIntroInfoModal } = useUIStore();

  const handleClick = (e) => {
    e.preventDefault();
    showIntroInfoModal();
  };

  return (
    <div className={cx("status-bar--item", "is-information")}>
      <button onClick={handleClick}>{label}</button>
    </div>
  );
});

export default Information;
