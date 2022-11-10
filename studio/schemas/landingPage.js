export default {
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    {
      name: "information",
      title: "Information",
      description: "Information about this project",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "image",
      title: "Image",
      description: "Landing page header image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
