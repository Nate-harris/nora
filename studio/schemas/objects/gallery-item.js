import { BsFillPuzzleFill } from "react-icons/bs";
import customImage from "../../lib/CustomImage";

export default {
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    customImage(),
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "frame",
      title: "Frame",
      type: "reference",
      to: [{ type: "frame" }],
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "color" }],
    },
  ],
  preview: {
    select: {
      photo: "photo",
      title: "name",
    },
    prepare(selection) {
      const { photo, title } = selection;
      return {
        title: title ?? "Gallery Item",
        media: photo ?? BsFillPuzzleFill,
      };
    },
  },
};
