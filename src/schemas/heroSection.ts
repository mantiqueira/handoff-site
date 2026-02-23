import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "ctaText", title: "CTA Text", type: "string" }),
    defineField({ name: "screenshot", title: "Screenshot", type: "image" }),
    defineField({ name: "catalogThumb", title: "Catalog Thumbnail", type: "image" }),
    defineField({ name: "backgroundPattern", title: "Background Pattern", type: "image" }),
    defineField({ name: "glowLine", title: "Glow Line", type: "image" }),
  ],
});
