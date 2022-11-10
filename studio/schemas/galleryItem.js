import { BsFillPuzzleFill } from "react-icons/bs";
export default {
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "borderColor",
      title: "Border Color",
      type: "color",
    },
  ],
  preview: {
    prepare(selection) {
      return {
        title: "Gallery Item",
        media: BsFillPuzzleFill,
      };
    },
  },
};
