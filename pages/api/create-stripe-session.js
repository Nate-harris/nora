import { getCommissionPrice } from "@/lib/sanity/getCommissionPrice";

const key =
  process.env.NODE_ENV === "development"
    ? process.env.STRIPE_DEV_SECRET_KEY
    : process.env.STRIPE_PROD_SECRET_KEY;
const stripe = require("stripe")(key);

async function CreateStripeSession(req, res) {
  const { item } = req.body;

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://norapuzzle.com/";

  const transformedItem = {
    price_data: {
      currency: "usd",
      product_data: {
        metadata: item.metadata,
        description: item.description,
        images: [item.image],
        name: item.name,
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [transformedItem],
    billing_address_collection: "auto",
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
        },
      },
    ],
    mode: "payment",
    success_url: redirectURL + "/order?status=success&step=5",
    cancel_url: redirectURL + "/order?status=cancel&step=5",
    metadata: {
      ...item.metadata,
      images: item.image,
    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
