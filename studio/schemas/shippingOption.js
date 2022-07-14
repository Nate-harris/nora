export default {
  name: "shippingOption",
  title: "Shipping Option",
  type: "object",
  fields: [
    {
      name: "type",
      title: "Type",
      description: "Ex. '3-4 weeks'",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
  ],
};
