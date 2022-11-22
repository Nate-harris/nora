import { WarningCircle } from "phosphor-react";

export default {
  title: "Header Settings",
  name: "headerSettings",
  type: "document",
  fields: [
    {
      title: "Menu",
      name: "menu",
      type: "reference",
      to: [{ type: "menu" }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Header Settings",
      };
    },
  },
};
