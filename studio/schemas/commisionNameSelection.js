export default {
  name: "commissionNameSelection",
  title: "Name Selection",
  type: "object",
  fields: [
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
      name: "price",
      title: "Price Per Letter",
      type: "number",
    },
    {
      name: "maxNumLetters",
      title: "Maximum Number of Letter",
      type: "number",
    },
  ],
};
