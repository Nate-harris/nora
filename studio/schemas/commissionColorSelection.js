export default {
  name: "commissionColorSelection",
  title: "Color Selection",
  type: "object",
  fields: [
    {
      name: "description",
      title: "Color Selection Description",
      description:
        "Ex. 'What would you like your colors to be? You can also choose to define your own palette.'",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "palettes",
      title: "Color Palettes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "palette" }],
        },
      ],
    },
    {
      name: "allowCustomCommissionColorSelection",
      title: "Allow Custom Color Selection",
      description:
        "Toggles the ability for a user to enter a custom color palette",
      type: "boolean",
    },
  ],
};
