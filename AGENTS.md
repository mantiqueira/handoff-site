# Handoff.ai Marketing Site — AGENTS.md

## Stack
- **Framework**: Astro 5.x (SSG mode, zero JS by default)
- **Styling**: Tailwind CSS 4.x (utility-first, `@import "tailwindcss"` in global.css)
- **Language**: TypeScript strict mode
- **Animations**: GSAP ScrollTrigger for scroll effects, CSS animations for micro-interactions, Astro View Transitions for page transitions
- **Interactive islands**: React components (only where client-side interactivity is required)
- **CMS**: Sanity (to be integrated later)
- **Hosting**: Cloudflare Pages

## Directory Structure
```
src/
├── assets/          # Static images, SVGs, fonts
├── components/
│   ├── ui/          # Reusable primitives (Button, Badge, Icon, etc.)
│   └── sections/    # Page-level sections (Hero, Features, FAQ, Footer, etc.)
├── layouts/         # Page layouts (BaseLayout.astro)
├── lib/             # Utilities, helpers, animation configs
├── pages/           # File-based routing (index.astro → /, pricing.astro → /pricing)
└── styles/          # global.css (Tailwind imports + custom theme)
```

## Conventions
- **Components**: PascalCase filenames. Astro components (`.astro`) for static content, React (`.tsx`) only for interactive islands.
- **Styling**: Use Tailwind utility classes directly. Custom CSS only in `global.css` via `@theme` or `@layer`. No CSS modules.
- **Colors**: Use Tailwind custom theme tokens defined in `global.css` (e.g., `bg-brand-800`, `text-brand-secondary`).
- **Typography**: `font-display` for headings (Bricolage Grotesque), `font-body` for body text (Geist).
- **Spacing**: Use Tailwind spacing scale. Prefer design system tokens over arbitrary values.
- **Naming**: Descriptive, self-documenting names. No abbreviations except standard ones (btn, img, nav).
- **Imports**: Use `@/` alias for `src/` paths.

## Prohibited Patterns
- No `useState`/`useEffect` in Astro components — use `.astro` files for static content.
- No CSS-in-JS libraries.
- No `!important` in styles.
- No inline `<style>` blocks in Astro components — use Tailwind utilities or global.css.
- No default exports from React components — use named exports.
- No barrel files (index.ts re-exports).

## Animation Guidelines
- GSAP: Use for scroll-triggered animations and complex timelines. Load via `<script>` in Astro.
- CSS: Use `@keyframes` and `transition` for hover effects, micro-interactions.
- View Transitions: Enabled in BaseLayout via `<ViewTransitions />`.

## SEO
- Every page must have unique `<title>` and `<meta name="description">`.
- Use semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`).
- All images must have `alt` attributes.
- Structured data (JSON-LD) for organization and pages.
