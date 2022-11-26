import { motion } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import Palette from "./Palette";
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

export default observer(({ options }) => {
  const { formData, setPalette } = useDataStore();

  const handleClick = (option) => {
    setPalette({ name: option.name, colors: option.colors });
  };
  const clearSelection = () => {
    setPalette(null);
  };

  return (
    <>
      <div className="w-full min-h-screen h-screen">
        <div className="p-24 py-156 pb-240 w-full min-h-screen h-screen overflow-scroll">
          {options.map((option, index) => (
            <Palette
              key={option.name}
              onClick={() => handleClick(option)}
              active={
                formData.palette !== null &&
                option.name === formData.palette.name
              }
              noneSelected={formData.palette === null}
              index={index}
              total={options.length}
              last={index === options.length - 1}
              {...option}
            />
          ))}

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
