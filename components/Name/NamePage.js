import { motion, useMotionValue } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";

import SVGText from "@/components/Name/SVGText";

import Drawer from "@/components/drawer";
import Photo from "../Photo";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../../utils/useWindowSize";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import { useIsSmall } from "../../utils/useMediaQueries";
import { useCallback } from "react";
import definedLetters from "./definedLetters";
import Swatch from "../Color/Swatch";
import SwatchCount from "../Color/SwatchCount";

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
  const {
    color: { colors, examples },
  } = data;

  const inputRef = useRef();
  const scale = useMotionValue(1);
  const windowSize = useWindowSize();
  const isSmall = useIsSmall();

  const [examplesOpen, setExamplesOpen] = useState(false);
  const toggleExamples = (e) => {
    e.preventDefault();
    setExamplesOpen(!examplesOpen);
  };

  const handleExampleClicked = (colors) => {
    clearColors();
    colors.forEach((color) => {
      addColor(color);
    });
    setExamplesOpen(false);
  };

  const { name, setName, clearColors, addColor } = useDataStore();
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
    <>
      <div className="xl-input">
        <input ref={inputRef} onChange={handleChange}></input>
        <SVGText
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            inputRef.current.focus();
          }}
          name={name}
        ></SVGText>
      </div>
      <SwatchCount />
      <div className="color-picker--swatches">
        <div className="color-picker--swatches-inner">
          {colors?.map((option) => {
            return <Swatch key={option.hex} data={option} />;
          })}
        </div>
      </div>
      <div className="color-picker--toggle-row">
        <button className="color-picker--toggle" onClick={toggleExamples}>
          {examplesOpen ? "Hide examples" : "See examples"}
        </button>
      </div>
      <Drawer
        direction="right"
        isOpen={examplesOpen}
        onClose={() => setExamplesOpen(false)}
        className="examples"
      >
        <div className="color-picker--examples">
          <button
            className="btn color-picker--close"
            onClick={() => setExamplesOpen(false)}
          >
            Close
          </button>
          {examples.map((example, index) => {
            return (
              <div key={index} className="color-picker--example">
                <Photo photo={example.photo} />
                <div className="flex flex-wrap gap-6">
                  {example.colors?.map((option, index) => {
                    return <Swatch key={option.hex} data={option} />;
                  })}
                </div>
                <button
                  className="color-picker--add-colors"
                  onClick={() => handleExampleClicked(example.colors)}
                >
                  Use colors
                </button>
              </div>
            );
          })}
        </div>
      </Drawer>
    </>
  );
});
