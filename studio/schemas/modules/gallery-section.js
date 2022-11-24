import { Square } from "phosphor-react";

export default {
  name: "gallerySection",
  title: "Gallery Section",
  type: "document",
  icon: Square,
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
  preview: {
    prepare(selection) {
      return {
        title: "Gallery Section",
        media: Square,
      };
    },
  },
};
