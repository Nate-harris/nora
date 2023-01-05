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

const Item = observer(
  ({ label, index, active, completed, disabled, onLayout }) => {
    const { formStep, setFormStep } = useUIStore();

    const router = useRouter();
    const itemWidth = useMotionValue(0);

    const itemRef = useRef();
    const itemRect = useRect(itemRef);
    const isSmall = useIsSmall();
    const PADDING = isSmall ? 30 : 40;
    useEffect(() => {
      if (itemRect) {
        const width = itemRect.width + PADDING;
        itemWidth.set(width);
      }
    }, [itemRect, itemWidth, onLayout, PADDING]);

    return (
      <li
        className={cx(
          "status-bar--item",
          completed && "is-completed",
          (active || disabled) && "is-disabled",
          active && "is-active"
        )}
      >
        <label ref={itemRef}>{label}</label>
        {active && (
          <motion.div
            style={{ width: itemWidth }}
            layoutId="status"
            className="status-bar--bubble"
          />
        )}
      </li>
    );
  }
);

export default Item;
