const stripe = require('stripe')(
  process.env.NODE_ENV === "development"
    ? process.env.STRIPE_DEV_SECRET_KEY
    : process.env.STRIPE_PROD_SECRET_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { item } = req.body;
    const key = process.env.NODE_ENV === "development"
      ? process.env.STRIPE_DEV_SECRET_KEY
      : process.env.STRIPE_PROD_SECRET_KEY;
    console.log("Stripe key starts with:", key?.slice(0, 8));
    console.log("Item received:", item);

    if (!key) {
      throw new Error("Stripe secret key is missing from environment variables.");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: item.description,
              images: [item.image],
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        },
      ],
      mode: "payment",
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
      success_url: "https://norapuzzle.com/order?status=success&step=5",
      cancel_url: "https://norapuzzle.com/order?status=cancel&step=5",
      metadata: item.metadata,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message, raw: error.raw, stack: error.stack });
  }
}
