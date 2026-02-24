import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqBlock",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqEntry",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
            }),
            defineField({ name: "answer", title: "Answer", type: "text" }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { enabled: "enabled" },
    prepare({ enabled }) {
      return {
        title: "FAQ",
        subtitle: enabled === false ? "Hidden" : "Visible",
      };
    },
  },
});
