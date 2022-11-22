import { motion, useMotionValue } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { useEffect, useRef } from "react";
import useWindowSize from "../../utils/useWindowSize";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";

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

export default observer(({ maxNumLetters = 30 }) => {
  const inputRef = useRef();
  const spanRef = useRef();
  const scale = useMotionValue(1);
  const windowSize = useWindowSize();
  const { formData, setName, updateBasePrice } = useDataStore();

  const PADDING = 350;

  const resize = (name) => {
    // Update width
    spanRef.current.textContent = name;
    const minWidth = name.length > 0 ? 0 : 600;
    const actualWidth = spanRef.current.offsetWidth;
    inputRef.current.style.width = Math.max(minWidth, actualWidth) + "px";

    // If too wide, scale down
    if (actualWidth > windowSize.width - PADDING) {
      const updatedScale = (windowSize.width - PADDING) / actualWidth;

      scale.set(updatedScale);
    }
  };

  const handleChange = (e) => {
    const name = e.target.value.replaceAll(/\s/g, "").toUpperCase();
    setName(name);
    const nameNoSpaces = name.replace(/\s/g, "");
    resize(nameNoSpaces);
    updateBasePrice(nameNoSpaces.length * 6000);
  };

  const handleBlur = () => {
    if (inputRef.current.value.length === 0) {
      inputRef.current.style.width = "400px";
    }
  };

  useEffect(() => {
    resize(formData.name);
  }, [windowSize.width]);

  return (
    <p className="xl-input">
      <span ref={spanRef} />
      <motion.input
        style={{ scale }}
        animate={{ opacity: !windowSize.width ? 0 : 1 }}
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
