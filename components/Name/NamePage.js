import { motion, useMotionValue } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";

import SVGText from "@/components/Name/SVGText";

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
  const { introInfoModalActive } = useUIStore();

  const resize = useCallback(
    (name) => {
      const DESKTOP_WIDTH = 700;
      const DESKTOP_PADDING = 400;

      const MOBILE_WIDTH = windowSize.width * 0.91;
      const MOBILE_PADDING = 40;

      const MIN_WIDTH = isSmall ? MOBILE_WIDTH : DESKTOP_WIDTH;
      const PADDING = isSmall ? MOBILE_PADDING : DESKTOP_PADDING;

      // Update width
      spanRef.current.textContent = name;
      const minWidth = name.length > 0 ? 0 : MIN_WIDTH;
      const actualWidth = spanRef.current.offsetWidth;
      if (inputRef) {
        inputRef.current.style.width = Math.max(minWidth, actualWidth) + "px";
      }

      // If too wide, scale down
      if (actualWidth > windowSize.width - PADDING) {
        const updatedScale = (windowSize.width - PADDING) / actualWidth;
        scale.set(updatedScale);
      } else {
        scale.set(1);
      }
    },
    [isSmall, windowSize.width, scale]
  );

  const handleChange = (e) => {
    const name = e.target.value.replaceAll(/\s/g, "").toUpperCase();
    setName(name);
  };

  const handleBlur = () => {
    if (inputRef.current.value.length === 0) {
      resize("");
    }
  };

  useEffect(() => {
    resize(name);
  }, [name, resize, windowSize.width]);

  useEffect(() => {
    if (inputRef.current) {
      if (introInfoModalActive) {
        inputRef.current.blur();
      } else {
        setTimeout(() => {
          inputRef.current.focus();
        }, 400);
      }
    }
  }, [introInfoModalActive]);

  return (
    <div className="xl-input">
      <span ref={spanRef} />
      <motion.input
        style={{ scale }}
        animate={{ opacity: !windowSize.width ? 0 : 1 }}
        ref={inputRef}
        className={"is-xl"}
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        value={name}
        placeholder="NAME"
        maxLength={maxNumLetters}
        autoComplete="off"
        autoFocus={true}
      />
      <SVGText name={name}></SVGText>
    </div>
  );
});
