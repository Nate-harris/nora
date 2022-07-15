import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import imageUrlFor from "../../lib/sanity/imageUrlFor";
const { className, styles } = css.resolve`
  div {
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    div {
    }
  }
`;

const variants = {
  hover: {
    scale: 0.95,
  },
};

const Frame = ({ type, templateImage, onClick }) => {
  const src = imageUrlFor(templateImage).width(400);
  return (
    <motion.div
      className={className}
      variants={variants}
      whileHover={"hover"}
      onClick={onClick}
    >
      <img src={src} />
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      `}</style>
      {styles}
    </motion.div>
  );
};
export default Frame;
