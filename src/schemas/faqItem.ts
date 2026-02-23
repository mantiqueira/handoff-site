import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "question", title: "Question", type: "string" }),
    defineField({ name: "answer", title: "Answer", type: "text" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
