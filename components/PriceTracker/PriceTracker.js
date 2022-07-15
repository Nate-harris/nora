import { PortableText } from "@portabletext/react";
import { useStore } from "../../lib/context";
import { observer } from "mobx-react-lite";
import css from "styled-jsx/css";
import { formatCurrencyString } from "use-shopping-cart";
import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
const { className, styles } = css.resolve`
  div {
    font-family: var(--font-family-heading);
    text-align: center;
    text-transform: uppercase;
    font-size: 2rem;
    line-height: 1.8rem;
    position: fixed;
    padding-bottom: var(--spacing-l);
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    pointer-events: none;
  }
  @media only screen and (max-width: 768px) {
    div {
    }
  }
`;

const variants = {
  active: {
    opacity: 1,
    y: 0,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
  inactive: {
    opacity: 0,
    y: 50,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
};

export default observer(() => {
  const {
    dataStore: { productPrice },
  } = useStore();
  return (
    <motion.div
      variants={variants}
      className={className}
      initial={"inactive"}
      animate={productPrice === 0 ? "inactive" : "active"}
    >
      {formatCurrencyString({
        value: productPrice,
        currency: "USD",
      })}
      {styles}
    </motion.div>
  );
});
