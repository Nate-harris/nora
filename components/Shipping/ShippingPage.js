import { LayoutGroup, motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";

import ShippingOption from "./ShippingOption";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";

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

export default observer(({ data }) => {
  const {
    shipping: { options },
  } = data;
  const { formData, setShipping, updateShippingPrice } = useDataStore();
  const handleChange = (shippingType) => {
    setShipping(shippingType);
    const option = options.find((option) => option.type === shippingType);
    updateShippingPrice(option.price);
  };
  const clearSelection = (e) => {
    e.preventDefault();
    setShipping(null);
  };
  return (
    <LayoutGroup>
      <div
        className={
          "flex flex-col justify-center gap-12 sm:pt-64 w-full sm:w-auto"
        }
      >
        {options.map((option, index) => (
          <ShippingOption
            key={option.type}
            index={index}
            active={
              formData.shipping !== null && formData.shipping === option.type
            }
            noneSelected={formData.shipping === null}
            onClick={() => handleChange(option.type)}
            {...option}
          />
        ))}

        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: formData.shipping !== null ? 1 : 0 }}
          className="flex justify-center p-16"
        >
          <button
            className="bg-transparent text-12 underline hover:text-orange"
            onClick={clearSelection}
          >
            Clear Selection
          </button>
        </motion.div>
      </div>
    </LayoutGroup>
  );
});
