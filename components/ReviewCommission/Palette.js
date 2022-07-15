import { motion, AnimateSharedLayout } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import Color from "./Color";
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

const Palette = ({ colors, width }) => {
  return (
    <div>
      {colors.map(({ hex }) => (
        <Color key={hex} color={hex} width={width / colors.length} />
      ))}

      <style jsx>{`
        div {
          display: flex;
          position: relative;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Palette;
