export default {
  name: "commission",
  title: "Commission",
  type: "document",
  fields: [
    {
      name: "nameSelection",
      title: "Name Selection",
      description: "Name the user wants",
      type: "commissionNameSelection",
      options: {
        collapsed: true,
        collapsible: true,
      },
    },
    {
      name: "colorSelection",
      title: "Color Selection",
      description: "Palettes a user can select from",
      type: "commissionColorSelection",
      options: {
        collapsed: true,
        collapsible: true,
      },
    },
    {
      name: "frameSelection",
      title: "Frame Selection",
      description: "Frame the user wants",
      type: "commissionFrameSelection",
      options: {
        collapsed: true,
        collapsible: true,
      },
    },
    {
      name: "shippingSelection",
      title: "Shipping Selection",
      description: "Shipping the user wants",
      type: "commissionShippingSelection",
      options: {
        collapsed: true,
        collapsible: true,
      },
    },
  ],
  initialValue: {
    currency: "usd",
  },
};
