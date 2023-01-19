import { motion, useMotionValue } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";

import { useEffect, useRef } from "react";
import useWindowSize from "../../utils/useWindowSize";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import { useIsSmall } from "../../utils/useMediaQueries";
import { useCallback } from "react";

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

export default observer(({ data }) => {
  const { pricePerLetter = 3000, maxNumLetters = 30 } = data;
  const inputRef = useRef();
  const spanRef = useRef();
  const scale = useMotionValue(1);
  const windowSize = useWindowSize();
  const isSmall = useIsSmall();

  const { name, setName } = useDataStore();

  const DESKTOP_WIDTH = 700;
  const DESKTOP_PADDING = 350;

  const MOBILE_WIDTH = 320;
  const MOBILE_PADDING = 50;
  const PADDING = isSmall ? MOBILE_PADDING : DESKTOP_PADDING;

  const resize = useCallback(
    (name) => {
      // Update width
      spanRef.current.textContent = name;
      const width = isSmall ? MOBILE_WIDTH : DESKTOP_WIDTH;
      const minWidth = name.length > 0 ? 0 : width;
      const actualWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = Math.max(minWidth, actualWidth) + "px";

      // If too wide, scale down
      if (actualWidth > windowSize.width - PADDING) {
        const updatedScale = (windowSize.width - PADDING) / actualWidth;
        scale.set(updatedScale);
      } else {
        scale.set(1);
      }
    },
    [isSmall, windowSize.width, PADDING, scale]
  );

  const handleChange = (e) => {
    const name = e.target.value.replaceAll(/\s/g, "").toUpperCase();
    setName(name);
  };

  const handleBlur = () => {
    if (inputRef.current.value.length === 0) {
      inputRef.current.style.width = DESKTOP_WIDTH;
    }
  };

  useEffect(() => {
    resize(name);
  }, [name, resize, windowSize.width]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  return (
    <div className="xl-input">
      <span ref={spanRef} />
      <motion.input
        style={{ scale }}
        animate={{ opacity: !windowSize.width ? 0 : 1 }}
        ref={inputRef}
        className={"is-xl"}
        onBlur={handleBlur}
        type="text"
        onChange={handleChange}
        value={name}
        placeholder="NORA"
        maxLength={maxNumLetters}
        autoComplete="off"
      />
    </div>
  );
});
