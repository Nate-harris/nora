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
      name: "includeReveal",
      title: "Include Reveal",
      type: "boolean",
      description:
        "When activated, users will first see the name written out in the default font and a panel will slide up revealing that name as a puzzle.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "textColor",
      title: "Text Color",
      type: "color",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "panelColor",
      title: "Panel Color",
      type: "color",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "borderColor",
      title: "Border Color",
      type: "color",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title ?? "Gallery Item",
        media: BsFillPuzzleFill,
      };
    },
  },
};
