import { defineType, defineField } from "sanity";

export default defineType({
  name: "navItem",
  title: "Nav Item",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href", title: "URL", type: "string" }),
    defineField({ name: "wide", title: "Wide Dropdown", type: "boolean" }),
    defineField({
      name: "children",
      title: "Children",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        },
      ],
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
