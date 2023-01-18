export default {
  title: "Commission",
  name: "commission",
  type: "document",
  groups: [
    { title: "Information", name: "information" },
    { title: "Name", name: "name", default: true },
    { title: "Color", name: "color" },
    { title: "Frame", name: "frame" },
    { title: "Shipping", name: "shipping" },
    { title: "Checkout", name: "checkout" },
  ],
  fields: [
    {
      name: "modalContent",
      title: "Information Modal Content",
      description:
        "Information on how the ordering process works. Will be accessible by the modal on the order page.",
      type: "complexPortableText",
      group: "information",
    },
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
      name: "collectAdditionalInfo",
      title: "Collect Additional Info?",
      description:
        "Add a field for additional information to be collected from the user.",
      type: "boolean",
      group: "checkout",
    },
    {
      name: "additionalInfoMessage",
      title: "Additional Info Message",
      description:
        "Information on what kind of additional information is needed.",
      type: "complexPortableText",
      group: "checkout",
    },
    {
      name: "additionalInfoLabel",
      title: "Additional Info Label",
      description: "Label above additional info input.",
      type: "complexPortableText",
      group: "checkout",
    },
    {
      name: "checkout",
      title: "Checkout",
      type: "checkout",
      group: "checkout",
    },
    {
      title: "Success Message",
      name: "successMessage",
      description: "Message to show after a successful checkout.",
      type: "complexPortableText",
      group: "checkout",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Order Settings",
      };
    },
  },
};
