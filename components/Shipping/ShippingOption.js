import { AnimatePresence, motion } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
  FRAMER_TRANSITION_FASTEREASE,
} from "../../lib/framer/animations";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { formatCurrencyString } from "use-shopping-cart";
import cx from "classnames";

const variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: FRAMER_TRANSITION_FASTEREASE,
  },
  active: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...FRAMER_TRANSITION_EASEOUT,
      delay: 0.3 * i + 0.2,
    },
  }),
};

const ShippingOption = ({
  active,
  noneSelected,
  type,
  price,
  onClick,
  index,
}) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="active"
      className={cx("btn", active && "is-active")}
      variants={variants}
      onClick={onClick}
    >
      <div className="text-18 py-8 whitespace-nowrap">{type}</div>
      <div className="text-10 py-8 opacity-50">
        {formatCurrencyString({
          value: price,
          currency: "USD",
        })}
      </div>
    </motion.div>
  );
};

export default ShippingOption;
