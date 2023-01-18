import { getCommissionPrice } from "@/lib/sanity/getCommissionPrice";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item } = req.body;

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://nora-new.vercel.app";
  console.log(item);
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
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
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
