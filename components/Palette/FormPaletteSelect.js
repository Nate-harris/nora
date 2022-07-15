import { motion, AnimateSharedLayout } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import Palette from "./Palette";
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
    dataStore: { formData, setPalette },
  } = useStore();
  return (
    <div onChange={(e) => setPalette(e.target.value)} value={formData.palette}>
      <AnimateSharedLayout>
        {options.map((option) => (
          <Palette
            key={option.name}
            {...option}
            onClick={() =>
              setPalette({ name: option.name, colors: option.colors })
            }
            active={option.name === formData.palette.name}
          />
        ))}
      </AnimateSharedLayout>
    </div>
  );
});
