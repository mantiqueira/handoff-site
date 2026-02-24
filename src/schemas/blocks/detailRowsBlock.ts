import { defineType, defineField } from "sanity";

export default defineType({
  name: "detailRowsBlock",
  title: "Detail Rows",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          name: "detailRowItem",
          fields: [
            defineField({
              name: "eyebrow",
              title: "Eyebrow",
              type: "string",
            }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "bullets",
              title: "Bullets",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "ctaText",
              title: "CTA Text",
              type: "string",
            }),
            defineField({
              name: "reverse",
              title: "Reverse Layout",
              type: "boolean",
            }),
            defineField({
              name: "visualType",
              title: "Visual Type",
              type: "string",
              options: { list: ["desktop", "phones", "isometric"] },
            }),
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [{ type: "image" }],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { enabled: "enabled" },
    prepare({ enabled }) {
      return {
        title: "Detail Rows",
        subtitle: enabled === false ? "Hidden" : "Visible",
      };
    },
  },
});
