import { defineType, defineField } from "sanity";

export default defineType({
  name: "footerColumn",
  title: "Footer Column",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "lightTitle", title: "Light Title", type: "boolean" }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
        },
      ],
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
