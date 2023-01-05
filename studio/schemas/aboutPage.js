export default {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    {
      name: "galleryItems",
      title: "Gallery Items",
      type: "array",
      of: [
        {
          type: "galleryItem",
        },
      ],
    },
  ],
};
