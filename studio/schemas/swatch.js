export default {
  name: "swatch",
  title: "Swatch",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "For internal purposes, to help identify your colors",
    },
    {
      title: "Color",
      name: "color",
      type: "color",
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
