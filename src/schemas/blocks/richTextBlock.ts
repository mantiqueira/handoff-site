import { defineType, defineField } from "sanity";

export default defineType({
  name: "richTextBlock",
  title: "Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: { enabled: "enabled" },
    prepare({ enabled }) {
      return {
        title: "Rich Text",
        subtitle: enabled === false ? "Hidden" : "Visible",
      };
    },
  },
});
