import { Rows } from "phosphor-react";

export default {
  name: "gallerySection",
  title: "Gallery Section",
  type: "document",
  icon: Rows,
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
        media: Rows,
      };
    },
  },
};
