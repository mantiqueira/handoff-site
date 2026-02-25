import { defineConfig, type Template } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./src/schemas";
import { resolve } from "./src/lib/resolve";

const singletonTypes = new Set([
  "heroSection",
  "featuresSection",
  "testimonial",
]);

export default defineConfig({
  name: "handoff",
  title: "Handoff CMS",
  projectId: "fuq5va06",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Pages
            S.listItem()
              .title("Pages")
              .schemaType("page")
              .child(S.documentTypeList("page").title("Pages")),
            // Blog Posts
            S.listItem()
              .title("Blog Posts")
              .schemaType("blogPost")
              .child(S.documentTypeList("blogPost").title("Blog Posts")),
            S.divider(),
            // Legacy singletons (kept during migration)
            S.listItem()
              .title("Hero Section")
              .id("heroSection")
              .child(
                S.document()
                  .schemaType("heroSection")
                  .documentId("heroSection"),
              ),
            S.listItem()
              .title("Features Section")
              .id("featuresSection")
              .child(
                S.document()
                  .schemaType("featuresSection")
                  .documentId("featuresSection"),
              ),
            S.listItem()
              .title("Testimonial")
              .id("testimonial")
              .child(
                S.document()
                  .schemaType("testimonial")
                  .documentId("testimonial"),
              ),
            S.divider(),
            // Global site chrome & collections
            ...S.documentTypeListItems().filter(
              (item) =>
                !singletonTypes.has(item.getId()!) &&
                !["page", "blogPost"].includes(item.getId()!),
            ),
          ]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        initial: location.origin.includes("sanity.studio")
          ? "https://handoff-site-ten.vercel.app"
          : location.origin,
      },
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => {
      // Filter out singleton creation templates
      const filtered = templates.filter(
        ({ schemaType }) => !singletonTypes.has(schemaType),
      );

      // Add page builder initial value templates
      const pageTemplates: Template[] = [
        {
          id: "page-landing",
          title: "Landing Page",
          schemaType: "page",
          value: {
            sections: [
              { _type: "heroBlock", enabled: true },
              { _type: "featuresBlock", enabled: true },
              { _type: "testimonialBlock", enabled: true },
              { _type: "detailRowsBlock", enabled: true },
              { _type: "faqBlock", enabled: true },
            ],
          },
        },
        {
          id: "page-feature",
          title: "Feature Page",
          schemaType: "page",
          value: {
            sections: [
              { _type: "heroBlock", enabled: true },
              { _type: "detailRowsBlock", enabled: true },
              { _type: "faqBlock", enabled: true },
            ],
          },
        },
      ];

      return [...filtered, ...pageTemplates];
    },
  },
});
