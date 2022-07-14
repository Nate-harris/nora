import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { useForm } from "react-hook-form";

const { className, styles } = css.resolve`
  button {
  }
  @media only screen and (max-width: 768px) {
    button {
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

export default ({ onClick, label, ...props }) => {
  return (
    <>
      <button className={className} onClick={onClick} {...props}>
        {label}
      </button>
      {styles}
    </>
  );
};
