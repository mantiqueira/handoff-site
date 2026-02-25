import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    publishedAt: z.coerce.date(),
    excerpt: z.string().optional(),
    featuredImage: z.string().optional(),
  }),
});

export const collections = { blog };
