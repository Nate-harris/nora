import React from "react";
export default {
  name: "commissionNameSelection",
  title: "Name Selection",
  type: "object",
  fieldsets: [
    {
      title: "",
      name: "2up",
      options: { columns: 2 },
    },
  ],
  fields: [
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The slug is used to identify the section of the form.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Name Selection Description",
      description: "Ex. 'What would you like the name to be? '",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "exampleName",
      title: "Example Name",
      type: "string",
      fieldset: "2up",
    },
    {
      name: "price",
      title: "Price Per Letter",
      type: "number",
      fieldset: "2up",
    },
    {
      name: "minNumLetters",
      title: "Minimum Number of Letter",
      type: "number",
      fieldset: "2up",
    },
    {
      name: "maxNumLetters",
      title: "Maximum Number of Letter",
      type: "number",
      fieldset: "2up",
    },
  ],
};
