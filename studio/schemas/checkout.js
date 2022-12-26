export default {
  name: "checkout",
  title: "Checkout",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Name",
      description: "Name of the item to show on the checkout page",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      description: "Description of the item to show on the checkout page",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      description: "Image for the Stripe checkout page",
      type: "image",
    },
  ],
};
