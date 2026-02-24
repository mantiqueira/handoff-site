import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "ctaText", title: "CTA Text", type: "string" }),
    defineField({ name: "screenshot", title: "Screenshot", type: "image" }),
    defineField({
      name: "catalogThumb",
      title: "Catalog Thumbnail",
      type: "image",
    }),
    defineField({
      name: "backgroundPattern",
      title: "Background Pattern",
      type: "image",
    }),
    defineField({ name: "glowLine", title: "Glow Line", type: "image" }),
  ],
  preview: {
    select: { title: "title", enabled: "enabled" },
    prepare({ title, enabled }) {
      return {
        title: title || "Hero",
        subtitle: enabled === false ? "Hidden" : "Visible",
      };
    },
  },
});
