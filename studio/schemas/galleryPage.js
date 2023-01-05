export default {
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    {
      name: "information",
      title: "Information",
      description: "Information about this project",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
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
