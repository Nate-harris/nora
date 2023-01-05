export default {
  name: "commissionColorSelection",
  title: "Color Selection",
  type: "object",
  fields: [
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The slug is used to identify the section of the form.",
      validation: (Rule) => Rule.required(),
    },
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
      name: "minNumColors",
      title: "Minimum Number of Colors",
      type: "number",
    },
    {
      name: "maxNumColors",
      title: "Maximum Number of Colors",
      type: "number",
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "color" }],
    },
    // {
    //   name: "allowCustomCommissionColorSelection",
    //   title: "Allow Custom Color Selection",
    //   description:
    //     "Toggles the ability for a user to enter a custom color palette",
    //   type: "boolean",
    // },
  ],
};
