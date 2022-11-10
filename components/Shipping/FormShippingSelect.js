import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
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

export default observer(({ options }) => {
  const { formData, setShipping, updateShippingPrice } = useDataStore();
  const { setNextButtonDisabled } = useUIStore();
  const handleChange = (shippingType) => {
    setNextButtonDisabled(false);
    setShipping(shippingType);
    const option = options.find((option) => option.type === shippingType);
    updateShippingPrice(option.price);
  };
  const clearSelection = () => {
    setNextButtonDisabled(true);
    setShipping(null);
  };
  return (
    <>
      <div className={"flex justify-center gap-8"}>
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
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: formData.shipping !== null ? 1 : 0 }}
        className="flex justify-center p-24"
      >
        <div className="btn" onClick={clearSelection}>
          Clear Selection
        </div>
      </motion.div>
    </>
  );
});
