import { observer } from "mobx-react-lite";
import { motion, useMotionValue, useTransform } from "framer-motion";
import cx from "classnames";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import { useRect } from "@reach/rect";
import { useState, useRef, useEffect } from "react";
import { useIsSmall } from "../../utils/useMediaQueries";
import Item from "@/components/StatusBar/Item";

const StatusBar = observer(({ step }) => {
  const {
    isNameCompleted,
    isColorCompleted,
    isFrameCompleted,
    isShippingCompleted,
  } = useDataStore();

  const offset = useMotionValue(0);
  const isSmall = useIsSmall();

  const steps = [
    { label: "Name", completed: isNameCompleted, disabled: !isNameCompleted },
    {
      label: "Color",
      completed: isColorCompleted,
      disabled: !isColorCompleted,
    },
    {
      label: "Frame",
      completed: isFrameCompleted,
      disabled: !isFrameCompleted,
    },
    {
      label: "Shipping",
      completed: isShippingCompleted,
      disabled: !isShippingCompleted,
    },
    {
      label: "Review",
      completed:
        isNameCompleted &&
        isColorCompleted &&
        isFrameCompleted &&
        isShippingCompleted,
      disabled: true,
    },
  ];

  useEffect(() => {
    offset.set(-1 * step * 50);
  }, [step, offset]);

  return (
    <div className={"status-bar--container"}>
      <div className={cx("status-bar--inner")}>
        <motion.ul style={{ x: isSmall ? offset : 0 }}>
          {steps.map((item, index) => {
            return (
              <Item
                key={index}
                index={index}
                label={item.label}
                completed={item.completed}
                disabled={item.disabled}
                active={index + 1 === step}
              />
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
});

export default StatusBar;
