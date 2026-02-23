/**
 * Seed Sanity with existing hardcoded content.
 * Run with: npx tsx scripts/seed.ts
 *
 * Requires SANITY_AUTH_TOKEN env var. Get one from:
 * https://www.sanity.io/manage/project/fuq5va06/api#tokens
 * Or run: npx sanity debug --secrets  (to see your current token)
 */
import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { resolve, join, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("Missing SANITY_AUTH_TOKEN. Get one from https://www.sanity.io/manage/project/fuq5va06/api#tokens");
  process.exit(1);
}

const client = createClient({
  projectId: "fuq5va06",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const ASSETS_DIR = resolve(__dirname, "../src/assets");

async function uploadImage(filePath: string) {
  const stream = createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, {
    filename: basename(filePath),
  });
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function seed() {
  console.log("Uploading images...");

  // Hero images
  const [screenshot, catalogThumb, backgroundPattern, glowLine] = await Promise.all([
    uploadImage(join(ASSETS_DIR, "images/hero-screenshot.png")),
    uploadImage(join(ASSETS_DIR, "images/catalog-thumb.png")),
    uploadImage(join(ASSETS_DIR, "images/background-pattern.png")),
    uploadImage(join(ASSETS_DIR, "images/hero-glow-line.svg")),
  ]);

  // Feature icons
  const [iconEstimate, iconWin, iconMoney] = await Promise.all([
    uploadImage(join(ASSETS_DIR, "icons/feature-estimate.svg")),
    uploadImage(join(ASSETS_DIR, "icons/feature-win.svg")),
    uploadImage(join(ASSETS_DIR, "icons/feature-money.svg")),
  ]);

  // Detail row images
  const [desktopMockup, phoneScreen, isoCard1, isoCard2, isoCard3] = await Promise.all([
    uploadImage(join(ASSETS_DIR, "images/desktop-mockup.png")),
    uploadImage(join(ASSETS_DIR, "images/phone-screen.png")),
    uploadImage(join(ASSETS_DIR, "images/iso-card-1.png")),
    uploadImage(join(ASSETS_DIR, "images/iso-card-2.png")),
    uploadImage(join(ASSETS_DIR, "images/iso-card-3.png")),
  ]);

  // Testimonial avatar
  const avatar = await uploadImage(join(ASSETS_DIR, "images/testimonial-avatar.png"));

  console.log("All images uploaded. Creating documents...");

  const tx = client.transaction();

  // Hero Section (singleton)
  tx.createOrReplace({
    _id: "heroSection",
    _type: "heroSection",
    eyebrow: "Construction-Trained AI for Sales and Lead Intake",
    title: "Never lose money to slow estimates",
    description:
      "Turn site visits into signed contracts faster than any competitor. Handoff captures every lead and generates complete estimates using trained AI built for construction.",
    ctaText: "See how it works",
    screenshot,
    catalogThumb,
    backgroundPattern,
    glowLine,
  });

  // Features Section (singleton)
  tx.createOrReplace({
    _id: "featuresSection",
    _type: "featuresSection",
    title: "Everything you need to win more projects",
    subtitle:
      "Handoff gives you the tools to respond faster, look more professional, and protect your margins on every job.",
    cards: [
      {
        _key: "card1",
        _type: "featureCard",
        icon: iconEstimate,
        title: "Estimate 10x faster",
        description:
          "Turn 3 hour estimates into 20-minute work using real contractor data, not guesswork, with your pricing rules baked right in.",
      },
      {
        _key: "card2",
        _type: "featureCard",
        icon: iconWin,
        title: "Win more projects",
        description:
          "Capture walkthrough details automatically and respond same-day. Automated follow-up keeps leads warm so you never lose a good prospect.",
      },
      {
        _key: "card3",
        _type: "featureCard",
        icon: iconMoney,
        title: "Make more money",
        description:
          "Send professional proposals instantly, know exactly when clients view them and keep leads moving with automated follow-up that actually works.",
      },
    ],
  });

  // Testimonial (singleton)
  tx.createOrReplace({
    _id: "testimonial",
    _type: "testimonial",
    avatar,
    name: "Benjamin B.",
    role: "Acting Construction Manager",
    source: "G2 review",
    rating: 5,
    quote:
      "Handoff has turned 3-hour estimates into 20-minute estimates ... I give a project scope, any plans and pictures, and it creates the entire estimate for me.",
    highlightText: "3-hour estimates into 20-minute estimates",
  });

  // Detail Rows
  const detailRows = [
    {
      _type: "detailRow",
      order: 1,
      eyebrow: "Lead intake & pipeline",
      title: "Never lose an opportunity",
      description:
        "Walk the job site, snap photos, talk into your phone, done. Every detail gets captured, even when you're juggling ten different jobs.",
      bullets: [
        "Your phone becomes your intake system",
        "Every photo, video, and note is automatically organized",
        "See all your leads at a glance, know exactly where each one stands",
      ],
      ctaText: "Get started",
      reverse: false,
      visualType: "desktop",
      images: [desktopMockup],
    },
    {
      _type: "detailRow",
      order: 2,
      eyebrow: "Rapid AI estimating",
      title: "Go from site visit to estimate, fast",
      description:
        "Stop spending your evenings on estimates. Start your walkthrough, describe what you see, take photos, and get a complete estimate before you're back in your truck.",
      bullets: [
        "Uses your pricing rules, not generic markup",
        "Applies material costs from actual suppliers in your area",
        "Trained on 100,000+ real contractor data",
      ],
      ctaText: "Get started",
      reverse: true,
      visualType: "phones",
      images: [phoneScreen],
    },
    {
      _type: "detailRow",
      order: 3,
      eyebrow: "Automated professional proposals",
      title: "Turn estimates into branded proposal with one click",
      description:
        "While your competition is still figuring out their pricing, you're already in the client's inbox.",
      bullets: [
        "Detailed professional proposals that wow your clients",
        "Your branding, your pricing, and your way of doing business",
      ],
      ctaText: "Get started",
      reverse: false,
      visualType: "isometric",
      images: [isoCard1, isoCard2, isoCard3],
    },
    {
      _type: "detailRow",
      order: 4,
      eyebrow: "Automated follow-up",
      title: "Keep every lead warm",
      description:
        "Never let a good lead go cold because you forgot to follow up. AI handles that, so you can focus on the work that pays.",
      bullets: [
        "Follow-ups happen automatically with email and SMS",
        "Get alerts when clients are viewing your proposals",
        "Turn more leads into signed proposals",
      ],
      ctaText: "Get started",
      reverse: true,
      visualType: "phones",
      images: [phoneScreen],
    },
    {
      _type: "detailRow",
      order: 5,
      eyebrow: "Consistent pricing systems",
      title: "Works for small jobs and big ones",
      description:
        "From a bathroom repair to a full kitchen remodel, Handoff handles it. Combine rooms, separate labor and materials, and manage markups at every level, all in one place.",
      bullets: [
        "Works for a single bathroom or a full home remodel",
        "Separate labor and materials or keep them combined, your call",
        "Manage markups at the line, room, or job level",
      ],
      ctaText: "Get started",
      reverse: false,
      visualType: "isometric",
      images: [isoCard1, isoCard2, isoCard3],
    },
  ];

  detailRows.forEach((row) => tx.create(row));

  // FAQ Items
  const faqItems = [
    { _type: "faqItem", order: 1, question: "How accurate are AI-generated estimates?", answer: "Handoff learns from your past projects and pricing rules, so estimates match how you actually build and price work. The more you use it, the smarter it gets." },
    { _type: "faqItem", order: 2, question: "Can I customize proposals and templates?", answer: "Yes. Every proposal uses your branding, your pricing structure, and your preferred layout. You control what clients see." },
    { _type: "faqItem", order: 3, question: "What if my pricing is complex?", answer: "Handoff handles multi-level markups, separate labor and material rates, room-by-room breakdowns, and custom pricing rules. If you can price it, Handoff can learn it." },
    { _type: "faqItem", order: 4, question: "How long does setup take?", answer: "Most contractors are up and running in under an hour. Import your pricing, connect your calendar, and start estimating." },
    { _type: "faqItem", order: 5, question: "Does this replace my estimators?", answer: "No — it makes them faster. Handoff handles the repetitive work so your team can focus on accuracy, client relationships, and winning more projects." },
  ];

  faqItems.forEach((item) => tx.create(item));

  // Footer Columns
  const footerColumns = [
    { _type: "footerColumn", order: 1, title: "Solutions", lightTitle: false, links: [{ _key: "s1", label: "Sales & Marketing Growth", href: "#" }, { _key: "s2", label: "Project Management", href: "#" }, { _key: "s3", label: "Financial Management", href: "#" }, { _key: "s4", label: "Pricing", href: "#" }] },
    { _type: "footerColumn", order: 2, title: "Who We Serve", lightTitle: false, links: [{ _key: "w1", label: "Established Remodelers", href: "#" }, { _key: "w2", label: "New & Small Businesses", href: "#" }, { _key: "w3", label: "Trade Contractors", href: "#" }] },
    { _type: "footerColumn", order: 3, title: "Resources", lightTitle: false, links: [{ _key: "r1", label: "Case Studies", href: "#" }, { _key: "r2", label: "Blog", href: "#" }, { _key: "r3", label: "Guides", href: "#" }, { _key: "r4", label: "Webinars", href: "#" }, { _key: "r5", label: "Testimonials", href: "#" }, { _key: "r6", label: "Contractor Course", href: "#" }] },
    { _type: "footerColumn", order: 4, title: "Company", lightTitle: false, links: [{ _key: "c1", label: "About us", href: "#" }, { _key: "c2", label: "Careers", href: "#" }, { _key: "c3", label: "Platform Updates", href: "#" }, { _key: "c4", label: "Community", href: "#" }] },
    { _type: "footerColumn", order: 5, title: "Support", lightTitle: false, links: [{ _key: "su1", label: "Help Center", href: "#" }, { _key: "su2", label: "Contact Us", href: "#" }, { _key: "su3", label: "Terms", href: "#" }, { _key: "su4", label: "Privacy", href: "#" }] },
  ];

  footerColumns.forEach((col) => tx.create(col));

  // Nav Items
  const navItemDocs = [
    { _type: "navItem", order: 1, label: "Who We Serve", wide: false, children: [{ _key: "n1a", label: "Established Remodelers", href: "#" }, { _key: "n1b", label: "New & Small Remodeling Businesses", href: "#" }, { _key: "n1c", label: "Trade Contractors & Handymen", href: "#" }] },
    { _type: "navItem", order: 2, label: "Solutions", wide: true, children: [{ _key: "n2a", label: "Sales & Marketing Growth", href: "#", description: "Win more projects with AI-powered estimates and proposals that convert leads into clients faster." }, { _key: "n2b", label: "Project Management & Operations", href: "#", description: "Streamline projects from estimate to completion with connected AI systems that save time and reduce errors." }, { _key: "n2c", label: "Financial & Business Management", href: "#", description: "Get paid faster with AI-powered digital invoicing, track profitability, and make data-driven decisions to grow your business." }] },
    { _type: "navItem", order: 3, label: "Pricing", href: "#" },
    { _type: "navItem", order: 4, label: "Resources", wide: false, children: [{ _key: "n4a", label: "Case Studies", href: "#" }, { _key: "n4b", label: "Blog", href: "#" }, { _key: "n4c", label: "Guides", href: "#" }, { _key: "n4d", label: "Webinars", href: "#" }, { _key: "n4e", label: "Testimonials", href: "#" }, { _key: "n4f", label: "Platform Updates", href: "#" }, { _key: "n4g", label: "Contractor Course", href: "#" }, { _key: "n4h", label: "Careers", href: "#" }, { _key: "n4i", label: "Handoff Nation Community", href: "#" }] },
    { _type: "navItem", order: 5, label: "Support", wide: false, children: [{ _key: "n5a", label: "Contact Us", href: "#" }, { _key: "n5b", label: "Help Center", href: "#" }] },
  ];

  navItemDocs.forEach((item) => tx.create(item));

  console.log("Committing transaction...");
  await tx.commit();
  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
