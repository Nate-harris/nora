import { motion } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { formatCurrencyString } from "use-shopping-cart";

const { className, styles } = css.resolve`
  div {
    margin: 0 var(--spacing-s);
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    div {
    }
  }
`;

const variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  active: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...FRAMER_TRANSITION_EASEOUT,
      delay: 0.3 * i,
    },
  }),
  hover: {
    scale: 0.95,
  },
};

const ShippingOption = ({ type, price, onClick, i }) => {
  return (
    <motion.div
      custom={i}
      className={className}
      variants={variants}
      initial={"initial"}
      animate={"active"}
      whileHover={"hover"}
      onClick={onClick}
    >
      <div className="button">{type}</div>
      <div className="price-label">
        {formatCurrencyString({
          value: price,
          currency: "USD",
        })}
      </div>
      <style jsx>{`
        .button {
          border: 5px solid var(--white);
          font-family: var(--font-family-heading);
          font-size: 1.5rem;
          padding: var(--spacing-s) var(--spacing-l);
        }
        .price-label {
          font-family: var(--font-family-heading);
          opacity: 0.5;
          text-align: center;
          margin-top: var(--spacing-s);
        }
      `}</style>
      {styles}
    </motion.div>
  );
};

export default ShippingOption;
