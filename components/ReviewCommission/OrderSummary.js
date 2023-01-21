import { AnimatePresence, motion } from "framer-motion";
import {
  FRAMER_TRANSITION_FASTEASE,
  swipeAnim,
} from "../../lib/framer/animations";
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
import BlockContent from "@/components/BlockContent";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import Photo from "../Photo";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";
import Modal from "../modal";

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
  const {
    name,
    frame,
    colors,
    shipping,
    additionalInfo,
    setAdditionalInfo,
    totalPrice,
  } = useDataStore();
  const { cartDetails, checkoutSingleItem, clearCart, redirectToCheckout } =
    useShoppingCart();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [additionalInfoPage, setAdditionalInfoPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    const { image } = data.checkout;
    setLoading(true);

    const colorsFormatString = colors
      .map((color) => `${color.title.toLowerCase()}`)
      .join(", ");
    const frameFormatString = frame.type.toLowerCase();

    let description = `In ${colorsFormatString}. With a ${frameFormatString} frame. Arriving in ${shipping}.`;

    if (additionalInfo.length > 0) {
      description += ` With added note: "${additionalInfo}".`;
    }

    const item = {
      name: `Puzzle for "${name}"`,
      description,
      price: totalPrice,
      quantity: 1,
      metadata: {
        Name: name,
        Frame: frame.type,
        Colors: colors
          .map((color) => `${color.title}: ${color.hex}`)
          .join(", "),
        Shipping: shipping,
        Note: additionalInfo,
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

  const handleAdditionalInfoClick = (e) => {
    e.preventDefault();
    setShowAdditionalInfo(!showAdditionalInfo);
  };
  const handleAddAdditionalInfoClick = (e) => {
    e.preventDefault();
    setAdditionalInfoPage(additionalInfoPage + 1);
  };
  const hideModal = () => {
    setShowAdditionalInfo(false);
  };
  const handleCheckout = async (event) => {
    event.preventDefault();
    await createCheckOutSession();
  };

  return (
    <>
      <div className="order-summary">
        <div className="order-summary--row">
          A puzzle for{" "}
          <span className="order-summary--name">
            {truncateString(name, 12)}
          </span>
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
          {additionalInfo.length > 0
            ? "Will get to you in"
            : "And will get to you in"}{" "}
          <span className="order-summary--shipping">{shipping}</span>
        </div>
        {additionalInfo.length > 0 && (
          <div className="order-summary--row">
            And we will keep in mind that{" "}
            <div className="order-summary--additional-info-note">
              {additionalInfo}
            </div>
          </div>
        )}
        <div className="order-summary--row">
          <Button
            onClick={handleCheckout}
            disabled={loading}
            label={loading ? "Opening..." : "Checkout"}
            className="is-active-control"
          />
          {data?.collectAdditionalInfo && (
            <button
              className="order-summary--additional-info-toggle"
              onClick={handleAdditionalInfoClick}
            >
              {additionalInfo.length > 0
                ? "Edit note"
                : "Anything else we should know?"}
            </button>
          )}
        </div>
      </div>

      {data?.collectAdditionalInfo && (
        <Modal isOpen={showAdditionalInfo} onClose={() => hideModal()}>
          <div className="order-summary--additional-info">
            {additionalInfoPage === 0 && (
              <motion.div
                key="additional-info-1"
                initial="hide"
                animate={"show"}
                exit="hide"
                variants={swipeAnim}
              >
                <BlockContent blocks={data.additionalInfoMessage} />
                <div className="order-summary--additional-info-buttons">
                  <button
                    className="btn is-white modal--toggle"
                    onClick={handleAddAdditionalInfoClick}
                  >
                    Add Info
                  </button>
                  <button
                    className="order-summary--additional-info-close"
                    onClick={() => hideModal()}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
            {additionalInfoPage === 1 && (
              <motion.div
                key="additional-info-2"
                initial="hide"
                animate={"show"}
                exit="hide"
                variants={swipeAnim}
                className="control order-summary--additional-info-second-page"
              >
                {data?.additionalInfoLabel && (
                  <BlockContent blocks={data.additionalInfoLabel} />
                )}
                <textarea
                  rows={6}
                  cols={40}
                  placeholder="You should know that..."
                  value={additionalInfo}
                  onChange={(e) => {
                    setAdditionalInfo(e.target.value);
                  }}
                ></textarea>
                <button
                  className="btn is-white modal--toggle"
                  onClick={() => hideModal()}
                >
                  Done
                </button>
                <button
                  className="order-summary--additional-info-close"
                  onClick={() => setAdditionalInfoPage(0)}
                >
                  Back
                </button>
              </motion.div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
});
