import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { AFFILIATES } from './src/data/affiliates.mjs';

// /go/<key>/ affiliate redirects (also emitted to public/_redirects for Cloudflare at build).
const redirects = Object.fromEntries(
  Object.entries(AFFILIATES).map(([key, url]) => [`/go/${key}`, { status: 302, destination: url }]),
);

export default defineConfig({
  site: 'https://healthstorymedia.com',
  trailingSlash: 'always',
  redirects,
  integrations: [sitemap({ filter: (page) => !page.includes('/go/') })],
});
