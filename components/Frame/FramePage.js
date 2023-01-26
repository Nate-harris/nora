import {
  animate,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";

import Frame from "./Frame";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import ColoringBook from "../Color/ColoringBook";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsSmall } from "@/utils/useMediaQueries";

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

const FRAME_BORDER = 32;
export default observer(({ data }) => {
  const {
    frame: { options },
  } = data;
  const { formData, frame, setFrame, updateFramePrice } = useDataStore();
  const isSmall = useIsSmall();
  const opacity = useMotionValue(isSmall ? 1 : 0);
  const y = useMotionValue(frame === null ? 0 : FRAME_BORDER);
  const framesRef = useRef({});
  const containerRef = useRef(null);
  const noraRef = useRef(null);
  const [offsetTop, setOffsetTop] = useState(0);

  const handleChange = (frame) => {
    setFrame(frame);
    const option = options.find((option) => option.type === frame.type);
    updateFramePrice(option.price);
  };

  const handleClick = (option) => {
    handleChange({ type: option.type, image: option.templateImage });
  };

  const clearSelection = (e) => {
    e.preventDefault();
    updateFramePrice(0);
    setFrame(null);
  };

  const lockNoraToFrame = useCallback(
    (frame) => {
      const selectedFrame = framesRef.current[frame.type];
      const nora = noraRef.current;
      if (selectedFrame && nora) {
        const { height: frameHeight } = selectedFrame.getBoundingClientRect();
        const { height: noraHeight } = nora.getBoundingClientRect();
        const updatedY = (frameHeight - noraHeight) / 2;
        console.log(updatedY);
        animate(y, updatedY, FRAMER_TRANSITION_FASTEASE);
        animate(opacity, 1);
      }
    },
    [opacity, y]
  );

  const unlockNoraFromFrame = useCallback(() => {
    const container = containerRef.current;
    const nora = noraRef.current;
    if (container && nora) {
      const { height: noraHeight } = nora.getBoundingClientRect();
      const { top: containerTop } = container.getBoundingClientRect();
      const updatedOffset = containerTop + noraHeight / 2;
      setOffsetTop(updatedOffset);
    }
  }, []);

  useEffect(() => {
    if (frame !== null) {
      lockNoraToFrame(frame);
    } else {
      // Wait for the animation to finish before getting offset
      // so we have the correct height.
      if (!isSmall) {
        setTimeout(
          unlockNoraFromFrame,
          FRAMER_TRANSITION_FASTEASE.duration * 1000
        );
      } else {
        animate(y, -128, FRAMER_TRANSITION_EASEOUT);
      }
    }
  }, [frame, y, isSmall, lockNoraToFrame, unlockNoraFromFrame]);

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

  const ySpring = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <>
      <motion.div
        onHoverStart={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onHoverEnd={handleMouseLeave}
        ref={containerRef}
        className="cursor-grabbing relative flex flex-col mt-96 sm:mt-64 w-full sm:w-auto"
      >
        <motion.div
          ref={noraRef}
          className="block absolute inset-x-24 sm:inset-x-36 z-6 pointer-events-none"
          style={{ y: ySpring, opacity }}
        >
          <ColoringBook allowCompleted={false} />
        </motion.div>
        {options.map((option, index) => {
          const active = frame !== null && frame.type === option.type;
          return (
            <Frame
              ref={(node) => {
                framesRef.current[option.type] = node;
              }}
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
        <button
          className="bg-transparent text-12 underline hover:text-orange"
          onClick={clearSelection}
        >
          Clear Selection
        </button>
      </motion.div>
    </>
  );
});
