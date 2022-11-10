import { sanityClient } from "./client";
import {
  pricePerLetterQuery,
  framePriceQuery,
  shippingPriceQuery,
} from "./queries";

export const getCommissionPrice = async (commission) => {
  console.log("commission:", commission);
  const { price: letterPrice } = await sanityClient.fetch(pricePerLetterQuery);
  const namePrice = commission.name.length * letterPrice;
  const { price: framePrice } = await sanityClient.fetch(framePriceQuery, {
    type: commission.frame.type,
  });
  const { price: shippingPrice } = await sanityClient.fetch(
    shippingPriceQuery,
    {
      type: commission.shipping,
    }
  );
  const totalPrice = namePrice + framePrice + shippingPrice;
  return [
    {
      id: "commission",
      name: "Nora Puzzle",
      description: "Custom wood block puzzle made by Nate Harris",
      currency: "USD",
      product_data: {
        metadata: {
          type: "commission",
        },
      },
      price_data: {
        unit_amount: totalPrice,
      },
    },
  ];
};
