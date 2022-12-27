import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";

import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import Palette from "./Palette";
import imageUrlFor from "../../lib/sanity/imageUrlFor";
import { useDataStore } from "../../providers/RootStoreProvider";
import { truncateString } from "../../studio/lib/helpers";
import { useState } from "react";
import Button from "../Controls/Button";
import { fetchPostJSON } from "@/utils/apiHelpers";
import { useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
const { className, styles } = css.resolve`
  div {
    display: grid;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: 768px) {
    div {
      padding: 0px;
      display: block;
      padding: 0 0.625rem;
      padding-top: 100px;
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

export default observer(({ data }) => {
  const router = useRouter();
  const { status } = router.query;
  const { formData, productPrice } = useDataStore();
  const { cartDetails, checkoutSingleItem, clearCart, redirectToCheckout } =
    useShoppingCart();
  const [loading, setLoading] = useState(false);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    const { name, description, image } = data.checkout;
    setLoading(true);

    const item = {
      name: name ?? "Nora Puzzle",
      price: productPrice,
      quantity: 1,
    };

    if (description) {
      item.description = description;
    }

    if (image) {
      item.image = imageUrlFor(image).url();
    }
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      item,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    await createCheckOutSession();
  };

  return (
    <div className="order-summary">
      <div className="order-summary--row">
        A puzzle for{" "}
        <span className="order-summary--name">
          {truncateString(formData.name, 10)}
        </span>
      </div>

      <div className="order-summary--row">
        Will be
        <div className="order-summary--palette">
          <Palette colors={formData.colors} width={200} />
        </div>
      </div>

      <div className="order-summary--row">
        Will have a
        {formData.frame?.image && (
          <div className="order-summary--frame">
            <img
              src={imageUrlFor(formData.frame.image).width(160)}
              alt={formData.frame.name}
            />
          </div>
        )}
      </div>
      <div className="order-summary--row">
        And will get to you in{" "}
        <span className="order-summary--shipping">{formData.shipping}</span>
      </div>
      <div className="order-summary--row">
        <Button
          key="checkout-button"
          onClick={handleCheckout}
          label="Checkout"
          className="is-active-control"
        />
      </div>
    </div>
  );
});
