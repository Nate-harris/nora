import { PaintBrushHousehold } from "phosphor-react";
import CustomImage from "../../lib/CustomImage";

export default {
  title: "Example Color",
  name: "exampleColor",
  type: "document",
  icon: PaintBrushHousehold,
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    CustomImage(),
    {
      title: "Colors",
      name: "colors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "swatch" }] }],
    },
  ],
};
