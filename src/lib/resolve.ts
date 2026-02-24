import { defineLocations, defineDocuments } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    page: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: doc?.slug === "home" ? "/" : `/${doc?.slug}`,
          },
        ],
      }),
    }),
    blogPost: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/blog/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
  mainDocuments: defineDocuments([
    {
      route: "/:slug",
      filter: `_type == "page" && slug.current == $slug`,
    },
    {
      route: "/blog/:slug",
      filter: `_type == "blogPost" && slug.current == $slug`,
    },
  ]),
};
