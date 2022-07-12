export default {
  name: "palette",
  title: "Palette",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "color" }],
    },
  ],
};
