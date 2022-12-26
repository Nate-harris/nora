export default {
  name: "commission",
  title: "Commission",
  type: "document",
  groups: [
    { title: "Name", name: "name", default: true },
    { title: "Color", name: "color" },
    { title: "Frame", name: "frame" },
    { title: "Shipping", name: "shipping" },
    { title: "Checkout", name: "checkout" },
  ],
  fields: [
    {
      name: "nameSelection",
      title: "Name Selection",
      description: "Name the user wants",
      type: "commissionNameSelection",
      group: "name",
    },
    {
      name: "colorSelection",
      title: "Color Selection",
      description: "Palettes a user can select from",
      type: "commissionColorSelection",
      group: "color",
    },
    {
      name: "frameSelection",
      title: "Frame Selection",
      description: "Frame the user wants",
      type: "commissionFrameSelection",
      group: "frame",
    },
    {
      name: "shippingSelection",
      title: "Shipping Selection",
      description: "Shipping the user wants",
      type: "commissionShippingSelection",
      group: "shipping",
    },
    {
      name: "checkout",
      title: "Checkout",
      type: "checkout",
      group: "checkout",
    },
  ],
};
