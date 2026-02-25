# Handoff Marketing Site — Claude Code Guide

## What this project is
Marketing website for Handoff, a SaaS for construction contractors. Built with Astro, deployed on Vercel as a 100% static site.

## Stack
- **Framework:** Astro 5.x (static output, no SSR)
- **Styling:** Tailwind CSS 4.x via `@tailwindcss/vite`
- **Deployment:** Vercel (`@astrojs/vercel` adapter)
- **Blog:** Astro Content Collections (markdown files in `src/content/blog/`)
- **Fonts:** Bricolage Grotesque (display), Geist (body), Geist Mono (mono) — loaded via Google Fonts

## Project structure
```
src/
├── assets/              # Images and icons (processed by Astro)
│   ├── icons/           # SVG feature icons
│   └── images/          # PNGs, SVGs for hero, mockups, etc.
├── components/
│   ├── sections/        # Full-width page sections (Hero, Features, FAQ, etc.)
│   └── ui/              # Small reusable elements (Button, Logo, icons)
├── content/
│   ├── config.ts        # Content Collection schema definitions
│   └── blog/            # Markdown blog posts (frontmatter: title, author, publishedAt, excerpt, featuredImage)
├── layouts/
│   └── BaseLayout.astro # HTML shell — head, meta, fonts, ViewTransitions
├── lib/
│   ├── animations.ts    # IntersectionObserver scroll animations (zero dependencies)
│   └── navigation.ts    # Static nav, footer, FAQ data
├── pages/
│   ├── index.astro      # Homepage
│   └── blog/
│       ├── index.astro  # Blog listing
│       └── [slug].astro # Blog post detail
└── styles/
    └── global.css       # Tailwind config, design tokens, custom utility classes
```

## Design tokens
All brand colors, spacing, shadows, and typography are defined as CSS custom properties in `src/styles/global.css` under `@theme`. Use these tokens — do not hardcode colors.

Key token prefixes:
- `brand-*` — Brand greens (50–900 + accent)
- `text-*` — Semantic text colors (primary, secondary, tertiary, on-brand)
- `bg-*` — Background colors
- `border-*` — Border colors

## Component conventions
1. **Every section component is self-contained.** It includes its own data, layout, and styles. You can edit one without breaking others.
2. **No props for content** on section components. Content is defined inside each component (or imported from `lib/navigation.ts` for shared data like nav/footer).
3. **All components are `.astro` files.** No React, no Vue, no client-side framework islands.
4. **Animations** use `data-animate="fade-up"` or `data-animate="stagger"` attributes. The `animations.ts` IntersectionObserver handles them. No GSAP.
5. **FAQ** uses native `<details>/<summary>` with CSS transitions. No JS needed.

## What NOT to change
- **Do not add React, Vue, or any JS framework.** This site ships zero framework JS.
- **Do not add GSAP or any animation library.** Use CSS transitions + the IntersectionObserver in `animations.ts`.
- **Do not add a CMS integration.** Blog uses local markdown via Content Collections.
- **Do not change `output` from `'static'`.** This must remain a fully static site.
- **Do not modify design tokens in `global.css`** without explicit approval — they define the entire visual system.
- **Do not add `styled-components`, CSS-in-JS, or CSS modules.** Use Tailwind utility classes.

## Adding a new page section
1. Create `src/components/sections/YourSection.astro`
2. Define content inline or import from `lib/navigation.ts`
3. Add `data-animate="fade-up"` to elements that should animate on scroll
4. Import and place in the relevant page file

## Adding a blog post
Create a markdown file in `src/content/blog/` with this frontmatter:
```md
---
title: "Your Post Title"
author: "Author Name"
publishedAt: 2026-01-15
excerpt: "Short description for listing page"
featuredImage: "/path/to/image.jpg"
---

Post content here...
```

## JS budget
The only client-side JS is:
- **~25 lines** of vanilla scroll handlers (header state + hero parallax) in page `<script>` tags
- **~20 lines** IntersectionObserver in `lib/animations.ts`
- That's it. Keep it this way.
