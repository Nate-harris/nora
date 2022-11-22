import { PortableText } from "@portabletext/react";
import { useStore } from "../../lib/context";
import { observer } from "mobx-react-lite";
import css from "styled-jsx/css";
import { formatCurrencyString } from "use-shopping-cart";
import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import { useDataStore } from "../../providers/RootStoreProvider";

const variants = {
  active: {
    opacity: 1,
    y: 0,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
  inactive: {
    opacity: 0,
    y: -100,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
};

export default observer(() => {
  const { productPrice } = useDataStore();
  return (
    <motion.div
      variants={variants}
      className={
        "fixed top-0 left-0 right-0 flex justify-center items-center text-12 leading-100 p-24"
      }
      initial={"inactive"}
      animate={productPrice === 0 ? "inactive" : "active"}
    >
      <span className="font-delaGothicOne bg-orange text-white rounded-full shadow-md px-12 pr-16 py-16">
        <span className="font-courierSans text-white rounded-full shadow-md px-24 py-8 mr-24 bg-pageBG text-pageText">
          Total
        </span>
        {formatCurrencyString({
          value: productPrice,
          currency: "USD",
        })}
      </span>
    </motion.div>
  );
});
