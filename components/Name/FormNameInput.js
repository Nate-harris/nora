import { motion, useMotionValue } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { useEffect, useRef } from "react";
import useWindowSize from "../../utils/useWindowSize";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import { useIsSmall } from "../../utils/useMediaQueries";

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

export default observer(({ pricePerLetter = 3000, maxNumLetters = 30 }) => {
  const inputRef = useRef();
  const spanRef = useRef();
  const scale = useMotionValue(1);
  const windowSize = useWindowSize();
  const isSmall = useIsSmall();
  const { formData, setName, updateBasePrice } = useDataStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const DESKTOP_WIDTH = 750;
  const DESKTOP_PADDING = 350;

  const MOBILE_WIDTH = 320;
  const MOBILE_PADDING = 50;
  const PADDING = isSmall ? MOBILE_PADDING : DESKTOP_PADDING;

  const resize = (name) => {
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
    }
    console.log(spanRef);
    console.log("resize", actualWidth, windowSize);
  };

  const handleChange = (e) => {
    const name = e.target.value.replaceAll(/\s/g, "").toUpperCase();
    setName(name);
    const nameNoSpaces = name.replace(/\s/g, "");
    resize(nameNoSpaces);
    updateBasePrice(nameNoSpaces.length * pricePerLetter);
  };

  const handleBlur = () => {
    if (inputRef.current.value.length === 0) {
      inputRef.current.style.width = DESKTOP_WIDTH;
    }
  };

  useEffect(() => {
    resize(formData.name);
  }, [windowSize.width]);

  return (
    <p className="xl-input mt-24 sm:mt-0">
      <span ref={spanRef} />
      <motion.input
        style={{ scale }}
        // animate={{ opacity: !windowSize.width ? 0 : 1 }}
        ref={inputRef}
        className={"is-xl"}
        onBlur={handleBlur}
        type="text"
        onChange={handleChange}
        value={formData.name}
        placeholder="NORA"
        maxLength={maxNumLetters}
      />
    </p>
  );
});
