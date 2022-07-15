import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { FORM_SCREENS } from "../../pages";
import { useShoppingCart } from "use-shopping-cart";
import PriceTracker from "../PriceTracker/PriceTracker";
import { useCallback, useState } from "react";
import { fetchPostJSON } from "../../utils/apiHelpers";

const { className, styles } = css.resolve`
  div {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--spacing-l);
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

const FormPageControls = () => {
  const { addItem, cartDetails, redirectToCheckout, clearCart } =
    useShoppingCart();
  const [loading, setLoading] = useState(false);

  const {
    dataStore: { formData, productPrice },
    uiStore: {
      formStep,
      incrementFormStep,
      decrementFormStep,
      isNextButtonDisabled,
      isPreviousButtonDisabled,
    },
  } = useStore();

  const handlePreviousButtonPressed = () => {
    decrementFormStep();
    clearCart();
  };

  const handleNextButtonPressed = () => {
    if (formStep + 1 === FORM_SCREENS) {
      addItem({ ...formData, price: productPrice });
    } else {
      clearCart();
    }
    incrementFormStep();
  };

  const handleCheckout = async (event) => {
    setLoading(true);

    //send the cart data to our serverless API
    const response = await fetchPostJSON(
      "/api/checkout_sessions/cart",
      cartDetails
    );

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }
    //if nothing went wrong, sends user to Stripe checkout
    redirectToCheckout({ sessionId: response.id });
  };

  return (
    <div className={className}>
      <Button
        key="previous-button"
        onClick={handlePreviousButtonPressed}
        label="Previous"
        disabled={isPreviousButtonDisabled}
      />

      {formStep < FORM_SCREENS ? (
        <Button
          key="next-button"
          onClick={handleNextButtonPressed}
          label="Next"
          disabled={isNextButtonDisabled}
        />
      ) : (
        <Button
          key="checkout-button"
          onClick={handleCheckout}
          label="Checkout"
        />
      )}
      {styles}
    </div>
  );
};
export default observer(FormPageControls);
