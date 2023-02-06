import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    const key =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_STRIPE_DEV_PUBLISHABLE_KEY
        : process.env.NEXT_PUBLIC_STRIPE_PROD_PUBLISHABLE_KEY;
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default getStripe;
