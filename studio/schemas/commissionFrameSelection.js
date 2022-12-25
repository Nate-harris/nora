export default {
  name: "commissionFrameSelection",
  title: "Frame Selection",
  type: "object",
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
      title: "Frame Selection Description",
      description: "Ex. 'What would you like the frame to be? '",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "options",
      title: "Frame Selection Options",
      description: "What frames the user can choose from",
      type: "array",
      of: [{ type: "reference", to: [{ type: "frame" }] }],
    },
  ],
};
