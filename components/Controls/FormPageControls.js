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

const FORM_SCREENS = 4;

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

const FormPageControls = () => {
  const { addItem, cartDetails, redirectToCheckout, clearCart } =
    useShoppingCart();
  const [loading, setLoading] = useState(false);

  const {
    formStep,
    incrementFormStep,
    decrementFormStep,
    noPreviousPage,
    noNextPage,
  } = useUIStore();

  const nextButtonDisabled = useIsNextButtonDisabled();

  const { formData, productPrice } = useDataStore();

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
    console.log("hello");
    //if nothing went wrong, sends user to Stripe checkout
    redirectToCheckout({ sessionId: response.id });
  };
  console.log(formStep, FORM_SCREENS);

  return (
    <div className={"fixed bottom-0 right-0 left-0 p-12 flex justify-between"}>
      <Button
        key="previous-button"
        onClick={handlePreviousButtonPressed}
        label="Back"
        disabled={noPreviousPage}
      />

      {formStep < FORM_SCREENS ? (
        <Button
          key="next-button"
          onClick={handleNextButtonPressed}
          label="Next"
          disabled={nextButtonDisabled || noNextPage}
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
    </div>
  );
};
export default observer(FormPageControls);
