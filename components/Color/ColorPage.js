import { motion } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import Palette from "./Palette";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import ColoringBook from "./ColoringBook";
import Swatch from "./Swatch";
import SwatchCount from "./SwatchCount";

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
    color: { palettes, colors },
  } = data;
  const { formData, setPalette, minNumColors } = useDataStore();

  const handleClick = (option) => {
    setPalette({ name: option.name, colors: option.colors });
  };
  const clearSelection = () => {
    setPalette(null);
  };

  return (
    <>
      <div className="w-full">
        <div className="p-24 md:mt-64 w-full">
          <div className="flex justify-center">
            <ColoringBook allowCompleted />
          </div>
          <SwatchCount />
          <div className="color-picker--swatches">
            <div className="color-picker--swatches-inner">
              {colors?.map((option, index) => {
                return <Swatch key={option.hex} data={option} />;
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: formData.palette !== null ? 1 : 0 }}
            className="flex justify-center p-24"
          >
            <div className="btn" onClick={clearSelection}>
              Clear Selection
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
});
