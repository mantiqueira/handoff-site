import { defineType, defineField } from "sanity";

export default defineType({
  name: "detailRow",
  title: "Detail Row",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "ctaText", title: "CTA Text", type: "string" }),
    defineField({ name: "reverse", title: "Reverse Layout", type: "boolean" }),
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
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
