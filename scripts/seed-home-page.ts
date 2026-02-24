/**
 * Migration script: reads existing singleton content from Sanity
 * and creates a "home" page document using the page builder schema.
 *
 * Usage:
 *   npx tsx scripts/seed-home-page.ts
 *
 * Prerequisites:
 *   - SANITY_PROJECT_ID and SANITY_DATASET env vars (or defaults below)
 *   - SANITY_TOKEN env var with write access
 */

import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "fuq5va06";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN;

if (!token) {
  console.error("SANITY_TOKEN env var is required (needs write access)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log("Fetching existing singleton content...");

  const [hero, features, testimonial, detailRows, faqItems] =
    await Promise.all([
      client.fetch(`*[_type == "heroSection"][0]{
      eyebrow, title, description, ctaText,
      screenshot, catalogThumb, backgroundPattern, glowLine
    }`),
      client.fetch(`*[_type == "featuresSection"][0]{
      title, subtitle, cards[]{ icon, title, description }
    }`),
      client.fetch(`*[_type == "testimonial"][0]{
      avatar, name, role, source, rating, quote, highlightText
    }`),
      client.fetch(`*[_type == "detailRow"] | order(order asc){
      eyebrow, title, description, bullets, ctaText, reverse, visualType, images
    }`),
      client.fetch(
        `*[_type == "faqItem"] | order(order asc){ question, answer }`,
      ),
    ]);

  // Build sections array
  const sections: any[] = [];

  if (hero) {
    sections.push({
      _type: "heroBlock",
      _key: "hero",
      enabled: true,
      eyebrow: hero.eyebrow,
      title: hero.title,
      description: hero.description,
      ctaText: hero.ctaText,
      screenshot: hero.screenshot,
      catalogThumb: hero.catalogThumb,
      backgroundPattern: hero.backgroundPattern,
      glowLine: hero.glowLine,
    });
  }

  if (features) {
    sections.push({
      _type: "featuresBlock",
      _key: "features",
      enabled: true,
      title: features.title,
      subtitle: features.subtitle,
      cards: (features.cards || []).map((c: any, i: number) => ({
        _type: "featuresCard",
        _key: `card-${i}`,
        icon: c.icon,
        title: c.title,
        description: c.description,
      })),
    });
  }

  if (testimonial) {
    sections.push({
      _type: "testimonialBlock",
      _key: "testimonial",
      enabled: true,
      avatar: testimonial.avatar,
      name: testimonial.name,
      role: testimonial.role,
      source: testimonial.source,
      rating: testimonial.rating,
      quote: testimonial.quote,
      highlightText: testimonial.highlightText,
    });
  }

  if (detailRows?.length) {
    sections.push({
      _type: "detailRowsBlock",
      _key: "detail-rows",
      enabled: true,
      rows: detailRows.map((r: any, i: number) => ({
        _type: "detailRowItem",
        _key: `row-${i}`,
        eyebrow: r.eyebrow,
        title: r.title,
        description: r.description,
        bullets: r.bullets,
        ctaText: r.ctaText,
        reverse: r.reverse,
        visualType: r.visualType,
        images: r.images,
      })),
    });
  }

  if (faqItems?.length) {
    sections.push({
      _type: "faqBlock",
      _key: "faq",
      enabled: true,
      items: faqItems.map((f: any, i: number) => ({
        _type: "faqEntry",
        _key: `faq-${i}`,
        question: f.question,
        answer: f.answer,
      })),
    });
  }

  console.log(`Built ${sections.length} sections from existing content.`);

  // Check if home page already exists
  const existing = await client.fetch(
    `*[_type == "page" && slug.current == "home"][0]{ _id }`,
  );

  if (existing) {
    console.log(`Home page already exists (${existing._id}). Updating...`);
    await client
      .patch(existing._id)
      .set({ sections })
      .commit();
    console.log("Home page updated.");
  } else {
    console.log("Creating new home page...");
    await client.create({
      _type: "page",
      title: "Home",
      slug: { _type: "slug", current: "home" },
      seoDescription:
        "Train an AI teammate to run your construction business. Set your rules once — Handoff applies them automatically across every estimate, proposal, and change order.",
      sections,
    });
    console.log("Home page created.");
  }

  console.log("Done! Visit /admin to see the new page.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
