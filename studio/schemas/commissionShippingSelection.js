export default {
  name: "commissionShippingSelection",
  title: "Shipping Selection",
  type: "object",
  fields: [
    {
      name: "description",
      title: "Shipping Selection Description",
      description: "Ex. 'When would you like to receive your puzzle? '",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "options",
      title: "Shipping Selection Options",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
  ],
};
