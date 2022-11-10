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
        "fixed top-0 left-0 right-0 flex justify-center items-center text-12 leading-100 p-32 before:content-['Total'] before:px-12 before:py-8 before:mx-8 before:bg-pageText before:text-pageBG before:rounded-lg"
      }
      initial={"inactive"}
      animate={productPrice === 0 ? "inactive" : "active"}
    >
      {formatCurrencyString({
        value: productPrice,
        currency: "USD",
      })}
    </motion.div>
  );
});
