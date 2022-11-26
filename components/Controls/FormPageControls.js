import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { useShoppingCart } from "use-shopping-cart";
import PriceTracker from "../PriceTracker/PriceTracker";
import { useCallback, useState } from "react";
import { fetchPostJSON } from "../../utils/apiHelpers";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import { useIsSmall } from "../../utils/useMediaQueries";
import { useRef } from "react";

const FORM_SCREENS = 4;

const useIsNextButtonDisabled = () => {
  const { formStep } = useUIStore();
  const { formData } = useDataStore();
  switch (formStep) {
    case 0:
      return formData.name.length <= 3;
    case 1:
      return formData.palette === null;
    case 2:
      return formData.frame === null;
    case 3:
      return formData.shipping === null;
  }
};

const variants = {
  active: {
    y: 0,

    transition: FRAMER_TRANSITION_FASTEASE,
  },

  inactive: {
    y: -60,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
};

const FormPageControls = () => {
  // If you spam either button, there is a chance that is messes with
  // the AnimatePresence wrapping the form components. Since there
  // is no reason we need to allow someone to click through that fast
  // set an articifical delay on the button click handlers.
  const [isThrottled, setIsThrottled] = useState(false);
  const throttleTimer = useRef(null);

  const { addItem, cartDetails, redirectToCheckout, clearCart } =
    useShoppingCart();
  const [loading, setLoading] = useState(false);
  const isSmall = useIsSmall();
  const {
    formStep,
    incrementFormStep,
    decrementFormStep,
    noPreviousPage,
    noNextPage,
  } = useUIStore();

  const nextButtonDisabled = useIsNextButtonDisabled();

  const { formData, productPrice } = useDataStore();

  const throttle = () => {
    setIsThrottled(true);
    if (throttleTimer.current !== null) {
      clearTimeout(throttleTimer.current);
    }
    throttleTimer.current = setTimeout(() => {
      setIsThrottled(false);
    }, FRAMER_TRANSITION_FASTEASE.duration * 1000);
  };

  const handlePreviousButtonPressed = () => {
    throttle();
    decrementFormStep();
    clearCart();
  };

  const handleNextButtonPressed = () => {
    throttle();
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
    <motion.div
      variants={variants}
      animate={isSmall && productPrice !== 0 ? "inactive" : "active"}
      className={"fixed bottom-0 right-0 left-0 p-32 flex justify-between"}
    >
      <Button
        key="previous-button"
        onClick={handlePreviousButtonPressed}
        label="Back"
        disabled={noPreviousPage || isThrottled}
      />

      {formStep < FORM_SCREENS ? (
        <Button
          key="next-button"
          onClick={handleNextButtonPressed}
          label="Next"
          disabled={nextButtonDisabled || noNextPage || isThrottled}
          className="is-active-control"
        />
      ) : (
        <Button
          key="checkout-button"
          onClick={handleCheckout}
          loading={loading}
          label="Checkout"
          className="is-active-control"
        />
      )}
    </motion.div>
  );
};
export default observer(FormPageControls);
