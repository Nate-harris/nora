import { observer } from "mobx-react-lite";
import { formatCurrencyString } from "use-shopping-cart";
import { useState } from "react";

import Palette from "./Palette";
import imageUrlFor from "../../lib/sanity/imageUrlFor";
import { useDataStore } from "../../providers/RootStoreProvider";
import { truncateString } from "../../studio/lib/helpers";
import Button from "../Controls/Button";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";
import { useAudio } from "@/utils/helpers";

const OrderSummary = observer(({ data }) => {
  const { name, colors, isGift, giftMessage, totalPrice } = useDataStore();
  const [playCheckoutSoundFx] = useAudio("/sounds/Hooray!.mp3");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const publishableKey =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_STRIPE_DEV_PUBLISHABLE_KEY
      : process.env.NEXT_PUBLIC_STRIPE_PROD_PUBLISHABLE_KEY;

  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    const { image } = data.checkout;
    const trimmedGiftMessage = giftMessage.trim();
    setLoading(true);

    const colorsFormatString = colors
      .map((color) => color.title.toLowerCase())
      .join(", ");

    let description = `In ${colorsFormatString}. With a red oak frame.`;

    if (isGift && trimmedGiftMessage) {
      description += ` Gift message: "${trimmedGiftMessage}".`;
    }

    const item = {
      name: `Puzzle for "${name}"`,
      description,
      price: totalPrice,
      quantity: 1,
      metadata: {
        Name: name,
        Frame: "Red Oak",
        Colors: colors
          .map((color) => `${color.title}: ${color.hex}`)
          .join(", "),
        "Puzzle Type": "STANDARD",
        Gift: isGift ? "YES" : "NO",
        "Gift Message": isGift ? trimmedGiftMessage : "",
      },
    };

    if (image) {
      item.image = imageUrlFor(image).url();
    }

    playCheckoutSoundFx();

    try {
      const stripe = await stripePromise;
      const checkoutSession = await axios.post("/api/create-stripe-session", {
        item,
      });
      setLoading(false);
      await stripe.redirectToCheckout({ sessionId: checkoutSession.data.id });
    } catch (error) {
      setLoading(false);
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
        Will cost
        <span className="order-summary--price">
          {formatCurrencyString({ value: totalPrice, currency: "USD" })}
        </span>
      </div>

      <div className="order-summary--row">
        Will have these colors
        <div className="order-summary--palette">
          <Palette colors={colors} width={200} />
        </div>
      </div>

      <div className="order-summary--row">
        And will ship free in
        <span className="order-summary--delivery">3 weeks</span>
        {isGift && (
          <span className="order-summary--gift">
            with your included gift message
          </span>
        )}
      </div>

      <div className="order-summary--row">
        <Button
          onClick={handleCheckout}
          disabled={loading}
          label={loading ? "Opening..." : "Checkout"}
          className="is-active-control"
        />
      </div>
    </div>
  );
});

export default OrderSummary;
