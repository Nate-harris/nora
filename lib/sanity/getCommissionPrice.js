import { sanityClient } from "./client";
import {
  framePriceQuery,
  shippingPriceQuery,
} from "./queries";
import { calculateNamePrice } from "../pricing";

export const getCommissionPrice = async (commission) => {
  const namePrice = calculateNamePrice(commission.name.length);
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
