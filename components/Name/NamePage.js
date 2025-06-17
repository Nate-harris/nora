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
import definedLetters from "./definedLetters";

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
  const scale = useMotionValue(1);
  const windowSize = useWindowSize();
  const isSmall = useIsSmall();

  const { name, setName } = useDataStore();
  const { introInfoModalActive } = useUIStore();

  const resize = useCallback(
    (name) => {
      inputRef.current.style.width = `${Math.max(175 * name.length, 300)}px`;
    },
    [isSmall, windowSize.width, scale, name]
  );

  const handleChange = useCallback(
    (e) => {
      let lastCharAdded = e.target.value.slice(-1);
      const name = definedLetters.includes(lastCharAdded.toUpperCase())
        ? e.target.value.toUpperCase()
        : e.target.value.slice(0, -1).toUpperCase();
      setName(name);

      if (name.length < e.target.value.length) {
        console.log("TODO: notify user of unsupported character");
      }
      e.target.value = name;
      console.log("Name changed to:", name);
    },
    [name]
  );

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
      <input ref={inputRef} onChange={handleChange}></input>
      <SVGText
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(inputRef.current);
          inputRef.current.focus();
        }}
        name={name}
      ></SVGText>
    </div>
  );
});
