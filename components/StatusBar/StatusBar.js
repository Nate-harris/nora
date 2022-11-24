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

const cx = classnames.bind(styles);

const Item = ({ label, active }) => {
  const itemWidth = useMotionValue(0);

  const itemRef = useRef();
  const itemRect = useRect(itemRef);
  useEffect(() => {
    if (itemRect) {
      itemWidth.set(itemRect.width + 40);
    }
  }, [itemRect, itemWidth]);
  return (
    <li className={cx(styles.li, "relative")}>
      <div
        className={cx(
          "relative flex items-center px-8 my-12 transition-all duration-700 before:shadow-md before:flex before:justify-center before:items-center before:relative before:rounded-full before:h-24 before:w-24 before:content-[counter(li-count)] before:transition-all before:duration-700",
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
          className="shadow-md absolute -z-1 -top-6 -bottom-6 right-0 left-0 rounded-full bg-pageText"
        />
      )}
    </li>
  );
};

const StatusBar = observer(() => {
  const { formStep } = useUIStore();
  const steps = ["Name", "Color", "Frame", "Shipping", "Review"];
  return (
    <div
      className={"fixed left-24 md:left-36 top-180 md:top-1/2 -translate-y-1/2"}
    >
      <ul className={cx("", styles.ul)}>
        {steps.map((step, index) => {
          return <Item key={index} label={step} active={index === formStep} />;
        })}
      </ul>
    </div>
  );
});

export default StatusBar;
