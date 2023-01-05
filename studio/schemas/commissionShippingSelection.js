export default {
  name: "commissionShippingSelection",
  title: "Shipping Selection",
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
          type: "reference",
          to: [
            {
              type: "shippingOption",
            },
          ],
        },
      ],
    },
  ],
};
