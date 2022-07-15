import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import Frame from "./Frame";
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
  const {
    dataStore: { formData, setFrame, updateFramePrice },
  } = useStore();

  const handleChange = (frame) => {
    setFrame(frame);
    const option = options.find((option) => option.type === frame.type);
    updateFramePrice(option.price);
  };

  return (
    <div>
      {options.map((option) => (
        <Frame
          key={option.type}
          {...option}
          onClick={() =>
            handleChange({ type: option.type, image: option.templateImage })
          }
        />
      ))}
    </div>
  );
});
