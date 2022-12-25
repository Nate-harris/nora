import { AnimatePresence, motion } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
  FRAMER_TRANSITION_FASTEREASE,
} from "../../lib/framer/animations";
import { observer } from "mobx-react-lite";

import { formatCurrencyString } from "use-shopping-cart";
import cx from "classnames";

const variants = {
  initial: {
    opacity: 0,
    x: 0,
    transition: FRAMER_TRANSITION_FASTEREASE,
  },
  exit: {
    opacity: 0,
    x: 0,
    transition: FRAMER_TRANSITION_FASTEREASE,
  },
  active: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      ...FRAMER_TRANSITION_EASEOUT,
      delay: 0.15 * i + 0.1,
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
    <AnimatePresence mode="sync">
      {(active || noneSelected) && (
        <motion.div
          layout
          custom={index}
          initial="initial"
          animate="active"
          exit="exit"
          className={cx("btn lg:w-xl sm:w-lg w-full", active && "is-active")}
          variants={variants}
          onClick={onClick}
        >
          <motion.div
            layout
            className="text-24 sm:text-48 py-8 font-delaGothicOne uppercase whitespace-nowrap"
          >
            {type}
          </motion.div>
          <div className="text-10 py-8 opacity-50">
            {formatCurrencyString({
              value: price,
              currency: "USD",
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShippingOption;
