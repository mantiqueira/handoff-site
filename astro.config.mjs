// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

const sanityProjectId = process.env.SANITY_PROJECT_ID || 'fuq5va06';

// https://astro.build/config
export default defineConfig({
  site: 'https://handoff.ai',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
  integrations: [
    react(),
    sanity({
      projectId: sanityProjectId,
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
    }),
  ],
});
