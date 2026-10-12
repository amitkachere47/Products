// Writes public/_redirects so Cloudflare Pages / Netlify serve real 302s for /go/<key>/.
import { writeFileSync } from 'node:fs';
import { AFFILIATES } from '../src/data/affiliates.mjs';

const lines = Object.entries(AFFILIATES).flatMap(([key, url]) => [
  `/go/${key} ${url} 302`,
  `/go/${key}/ ${url} 302`,
]);
writeFileSync(new URL('../public/_redirects', import.meta.url), lines.join('\n') + '\n');
console.log(`Wrote ${lines.length / 2} affiliate redirects`);
