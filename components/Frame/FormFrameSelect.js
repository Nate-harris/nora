import { LayoutGroup, motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import Frame from "./Frame";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
const { className, styles } = css.resolve`
  div {
    display: grid;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: 768px) {
    div {
      padding: 0px;
      display: block;
      padding: 0 0.625rem;
      padding-top: 100px;
    }
  }
`;

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
  const { formData, setFrame, updateFramePrice } = useDataStore();
  const handleChange = (frame) => {
    setFrame(frame);
    const option = options.find((option) => option.type === frame.type);
    updateFramePrice(option.price);
  };

  const handleClick = (option) => {
    handleChange({ type: option.type, image: option.templateImage });
  };

  const clearSelection = () => {
    setFrame(null);
  };

  return (
    <>
      <div className="flex flex-col gap-y-24 pt-64">
        {options.map((option, index) => (
          <Frame
            key={option.type}
            active={
              formData.frame !== null && formData.frame.type === option.type
            }
            noneSelected={formData.frame === null}
            onClick={() => handleClick(option)}
            index={index}
            {...option}
          />
        ))}
      </div>
      <motion.div
        animate={{ opacity: formData.frame !== null ? 1 : 0 }}
        className="flex justify-center p-24"
      >
        <div className="btn" onClick={clearSelection}>
          Clear Selection
        </div>
      </motion.div>
    </>
  );
});
