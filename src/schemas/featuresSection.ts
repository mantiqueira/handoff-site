import { defineType, defineField } from "sanity";

const featureCard = defineType({
  name: "featureCard",
  title: "Feature Card",
  type: "object",
  fields: [
    defineField({ name: "icon", title: "Icon", type: "image" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});

const featuresSection = defineType({
  name: "featuresSection",
  title: "Features Section",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text" }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [{ type: "featureCard" }],
    }),
  ],
});

export { featureCard };
export default featuresSection;
