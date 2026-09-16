import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL erlaubt Preview-Deployments unter einer anderen Domain,
// ohne dass Canonical- und OG-Tags auf die Live-Domain zeigen.
const site = process.env.SITE_URL ?? 'https://rsacademy.ch';

export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()],
  },
});
