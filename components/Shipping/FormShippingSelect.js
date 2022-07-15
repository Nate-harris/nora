import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import ShippingOption from "./ShippingOption";
const { className, styles } = css.resolve`
  div {
    display: flex;
  }
  @media only screen and (max-width: 768px) {
    div {
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

export default observer(({ options }) => {
  const {
    dataStore: { formData, setShipping, updateShippingPrice },
  } = useStore();
  const handleChange = (shippingType) => {
    setShipping(shippingType);
    const option = options.find((option) => option.type === shippingType);
    updateShippingPrice(option.price);
  };
  return (
    <div
      className={className}
      onChange={handleChange}
      value={formData.shipping}
    >
      {options.map((option, i) => (
        <ShippingOption
          key={option.type}
          i={i}
          onClick={() => handleChange(option.type)}
          {...option}
        />
      ))}
      {styles}
    </div>
  );
});
