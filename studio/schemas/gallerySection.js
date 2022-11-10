export default {
  name: "gallerySection",
  title: "Gallery Section",
  type: "document",
  fields: [
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "galleryItem",
        },
      ],
    },
  ],
};
