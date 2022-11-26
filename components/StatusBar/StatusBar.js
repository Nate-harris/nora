import { useStore } from "../../lib/context";
import { observer } from "mobx-react-lite";
import {
  AnimateSharedLayout,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import classnames from "classnames";
import styles from "./StatusBar.module.css";
import { useUIStore } from "../../providers/RootStoreProvider";
import { useRect } from "@reach/rect";
import { useState, useRef, useEffect } from "react";
import { useIsSmall } from "../../utils/useMediaQueries";

const cx = classnames.bind(styles);

const Item = ({ label, active, onLayout }) => {
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
    <li className={cx(styles.li, "relative")}>
      <div
        className={cx(
          "text-12 my-4 md:my-6 mx-2 sm:mx-0 relative flex items-center pl-8 transition-all duration-700 before:shadow-md before:flex before:justify-center before:items-center before:relative before:rounded-full before:text-8 before:sm:text-12 before:h-16 before:w-16 sm:before:h-24 sm:before:w-24 before:content-[counter(li-count)] before:transition-all before:duration-700",
          active && "text-pageBG before:bg-pageBG before:text-pageText",
          !active && "text-pageText before:bg-pageText before:text-pageBG"
        )}
      >
        <label ref={itemRef} className={"px-8"}>
          {label}
        </label>
      </div>
      {active && (
        <motion.div
          style={{ width: itemWidth }}
          layoutId="status"
          className="shadow-md absolute -z-1 top-0 bottom-0 right-0 left-0 rounded-full bg-pageText"
        />
      )}
    </li>
  );
};

const StatusBar = observer(() => {
  const { formStep } = useUIStore();

  const offset = useMotionValue(0);
  const isSmall = useIsSmall();

  const steps = ["Name", "Color", "Frame", "Shipping", "Review"];

  useEffect(() => {
    offset.set(-1 * formStep * 50);
  }, [formStep, offset, steps.length]);

  return (
    <div
      className={
        "fixed left-24 md:left-12 top-24 sm:top-1/2 right-24 sm:right-auto translate-y-0 sm:-translate-y-1/2"
      }
    >
      <div
        className={cx(
          "border border-pageText sm:border-transparent rounded-2xl px-6 py-4 overflow-hidden sm:overflow-auto"
        )}
      >
        <motion.ul
          style={{ x: isSmall ? offset : 0 }}
          className={cx("flex sm:flex-col", styles.ul)}
        >
          {steps.map((step, index) => {
            return (
              <Item key={index} label={step} active={index === formStep} />
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
});

export default StatusBar;
