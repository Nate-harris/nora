export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Backlog", value: "backlog" },
          { title: "Proof Sent", value: "proofSent" },
          { title: "Proof Confirmed", value: "proofConfirmed" },
          { title: "Shipped", value: "shipped" },
        ],
        layout: "radio",
      },
    },

    {
      name: "name",
      title: "Name",
      description: "Name the user wants",
      type: "string",
      readOnly: true,
    },
    {
      name: "palette",
      title: "Colors",
      description: "Palette the user wants",
      type: "array",
      of: [{ type: "color" }],
      readOnly: true,
    },
    {
      name: "frame",
      title: "Frame",
      description: "Frame the user wants",
      type: "string",
      readOnly: true,
    },
    {
      name: "shipping",
      title: "Shipping",
      description: "Shipping the user wants",
      type: "string",
      readOnly: true,
    },
  ],
  initialValue: {
    currency: "usd",
  },
};
