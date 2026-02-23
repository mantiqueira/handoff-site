import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/schemas";

const singletonTypes = new Set(["heroSection", "featuresSection", "testimonial"]);

export default defineConfig({
  name: "handoff",
  title: "Handoff CMS",
  projectId: import.meta.env.SANITY_PROJECT_ID || "fuq5va06",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons
            S.listItem()
              .title("Hero Section")
              .id("heroSection")
              .child(S.document().schemaType("heroSection").documentId("heroSection")),
            S.listItem()
              .title("Features Section")
              .id("featuresSection")
              .child(S.document().schemaType("featuresSection").documentId("featuresSection")),
            S.listItem()
              .title("Testimonial")
              .id("testimonial")
              .child(S.document().schemaType("testimonial").documentId("testimonial")),
            S.divider(),
            // Lists
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId()!)
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
});
