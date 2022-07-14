export default {
  name: "frame",
  title: "Frame",
  type: "document",
  fields: [
    {
      name: "type",
      title: "Type",
      description: "What type of frame is this option?",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "templateImage",
      type: "image",
      description: "Picture of the empty frame to use as a selection option",
      options: {
        hotspot: true,
      },
    },
    {
      name: "exampleImages",
      title: "Example Images",
      description: "Pictures the frame in use",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
};
