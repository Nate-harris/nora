import { PaperPlaneTilt, List, GlobeSimple } from "phosphor-react";

export default {
  title: "Footer Settings",
  name: "footerSettings",
  type: "document",
  groups: [
    {
      title: "Block 1",
      name: "column1",
      icon: PaperPlaneTilt,
      default: true,
    },
    {
      title: "Block 2",
      name: "column2",
      icon: List,
    },
    {
      title: "Block 3",
      name: "column3",
      icon: List,
    },
    {
      title: "Block 4",
      name: "column4",
      icon: GlobeSimple,
    },
  ],
  fields: [
    {
      title: "Block Title",
      name: "blockTitle4",
      type: "string",
      group: "column4",
    },
    {
      title: "Social Links",
      name: "social",
      type: "array",
      of: [{ type: "socialLink" }],
      group: "column4",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Footer Settings",
      };
    },
  },
};
