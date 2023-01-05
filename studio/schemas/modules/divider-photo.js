import { Image } from "phosphor-react";

import customImage from "../../lib/CustomImage";

export default {
  title: "Divider Photo",
  name: "dividerPhoto",
  type: "object",
  icon: Image,
  fields: [
    {
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
    },
    customImage(),
  ],
  preview: {
    select: {
      photo: "photo",
    },
    prepare({ photo }) {
      return {
        title: "Divider Photo",
        media: photo,
      };
    },
  },
};
