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
import Photo from "../Photo";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

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
  const { name, frame, colors, shipping, totalPrice } = useDataStore();
  const { cartDetails, checkoutSingleItem, clearCart, redirectToCheckout } =
    useShoppingCart();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    const { description, image } = data.checkout;
    setLoading(true);

    const item = {
      name: name ?? "Nora Puzzle",
      description: `1x puzzle for ${name}, in ${colors.join(", ")}, with a ${
        frame.type
      } frame, and arriving in ${shipping}.`,
      price: totalPrice,
      quantity: 1,
      metadata: {
        Name: name,
        Frame: frame.type,
        Colors: colors.join(", "),
        Shipping: shipping,
      },
    };

    if (image) {
      item.image = imageUrlFor(image).url();
    }

    try {
      const stripe = await stripePromise;

      const checkoutSession = await axios.post("/api/create-stripe-session", {
        item,
      });
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });
      setLoading(false);
    } catch (error) {
      toast.error(
        "Problem redirecting to checkout. Please check your connection and try again.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme,
        }
      );
    }
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    await createCheckOutSession();
  };

  return (
    <div className="order-summary">
      <div className="order-summary--row">
        A puzzle for{" "}
        <span className="order-summary--name">{truncateString(name, 12)}</span>
      </div>

      <div className="order-summary--row">
        Will be
        <div className="order-summary--palette">
          <Palette colors={colors} width={200} />
        </div>
      </div>

      <div className="order-summary--row">
        Will have a
        {frame && (
          <div className="order-summary--frame">
            <Photo photo={frame.image} width={160} alt={frame.name} />
          </div>
        )}
      </div>
      <div className="order-summary--row">
        And will get to you in{" "}
        <span className="order-summary--shipping">{shipping}</span>
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
