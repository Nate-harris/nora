import {
  animate,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";

import Frame from "./Frame";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import ColoringBook from "../Color/ColoringBook";
import { useEffect, useRef, useState } from "react";

const variants = {
  in: {
    opacity: 1,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
  out: {
    opacity: 0,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
};

const FRAME_BORDER = 8;
export default observer(({ data }) => {
  const {
    frame: { options },
  } = data;
  const { formData, frame, setFrame, updateFramePrice } = useDataStore();
  const opacity = useMotionValue(0);
  const y = useMotionValue(frame === null ? 0 : FRAME_BORDER);
  const containerRef = useRef(null);
  const noraRef = useRef(null);
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {}, []);

  const handleChange = (frame) => {
    setFrame(frame);
    const option = options.find((option) => option.type === frame.type);
    updateFramePrice(option.price);
  };

  const handleClick = (option) => {
    handleChange({ type: option.type, image: option.templateImage });
  };

  const clearSelection = () => {
    setFrame(null);
  };

  useEffect(() => {
    if (frame !== null) {
      animate(y, FRAME_BORDER);
      animate(opacity, 1);
    }

    // Wait for the animation to finish before getting offset
    // so we have the correct height.
    setTimeout(() => {
      const container = containerRef.current;
      const nora = noraRef.current;
      if (container && nora) {
        const { height } = nora.getBoundingClientRect();
        const { top } = container.getBoundingClientRect();
        setOffsetTop(top + height / 2);
      }
    }, FRAMER_TRANSITION_FASTEASE.duration * 1000);
  }, [y, opacity, frame]);

  const handleMouseEnter = () => {
    animate(opacity, 1);
  };

  const handleMouseMove = (event) => {
    if (frame !== null) return;
    y.set(event.clientY - offsetTop);
  };

  const handleMouseLeave = () => {
    if (frame !== null) return;
    animate(opacity, 0);
  };

  const ySpring = useSpring(y, { stiffness: 100, damping: 16 });

  return (
    <>
      <motion.div
        onHoverStart={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onHoverEnd={handleMouseLeave}
        ref={containerRef}
        className="cursor-grabbing relative flex flex-col sm:mt-64 gap-12 md:gap-0 w-full sm:w-auto p-24 pt-0"
      >
        <motion.div
          ref={noraRef}
          className="absolute inset-x-64 z-6 pointer-events-none"
          style={{ y: ySpring, opacity }}
        >
          <ColoringBook />
        </motion.div>
        {options.map((option, index) => {
          const active = frame !== null && frame.type === option.type;
          return (
            <Frame
              key={option.type}
              active={active}
              noneSelected={frame === null}
              onClick={() => handleClick(option)}
              index={index}
              {...option}
            />
          );
        })}
      </motion.div>
      <motion.div
        animate={{ opacity: frame !== null ? 1 : 0 }}
        className="flex justify-center p-24"
      >
        <div className="btn" onClick={clearSelection}>
          Clear Selection
        </div>
      </motion.div>
    </>
  );
});
