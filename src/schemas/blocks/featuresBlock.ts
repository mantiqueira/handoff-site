import { defineType, defineField } from "sanity";

export default defineType({
  name: "featuresBlock",
  title: "Features",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text" }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "featuresCard",
          fields: [
            defineField({ name: "icon", title: "Icon", type: "image" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
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
    select: { title: "title", enabled: "enabled" },
    prepare({ title, enabled }) {
      return {
        title: title || "Features",
        subtitle: enabled === false ? "Hidden" : "Visible",
      };
    },
  },
});
