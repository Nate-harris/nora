import { motion } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import ColoringBook from "./ColoringBook";
import Swatch from "./Swatch";
import SwatchCount from "./SwatchCount";
import Drawer from "@/components/drawer";
import { useState } from "react";
import Photo from "../Photo";

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
  const { formData, setPalette, clearColors, addColor, minNumColors } =
    useDataStore();

  const [examplesOpen, setExamplesOpen] = useState(false);

  const toggleExamples = (e) => {
    e.preventDefault();
    setExamplesOpen(!examplesOpen);
  };

  const handleExampleClicked = (colors) => {
    clearColors();
    colors.forEach((color) => {
      addColor(color.hex);
    });
    setExamplesOpen(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="p-24 md:mt-64 w-full">
          <div className="flex justify-center w-full h-120 md:h-240 ">
            <ColoringBook allowCompleted={!examplesOpen} />
          </div>
          <SwatchCount />
          <div className="color-picker--swatches">
            <div className="color-picker--swatches-inner">
              {colors?.map((option, index) => {
                return <Swatch key={option.hex} data={option} />;
              })}
            </div>
          </div>
          <div className="color-picker--toggle-row">
            <button className="color-picker--toggle" onClick={toggleExamples}>
              {examplesOpen ? "Hide examples" : "See examples"}
            </button>
          </div>
        </div>
      </div>
      <Drawer
        direction="right"
        isOpen={examplesOpen}
        onClose={() => setExamplesOpen(false)}
        className="examples"
      >
        <div className="color-picker--examples">
          <button
            className="color-picker--close"
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
