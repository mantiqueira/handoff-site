import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "avatar", title: "Avatar", type: "image" }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "source", title: "Source", type: "string" }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "quote", title: "Quote", type: "text" }),
    defineField({ name: "highlightText", title: "Highlight Text", type: "string" }),
  ],
});
