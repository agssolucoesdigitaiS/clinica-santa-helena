// Gera dist/sitemap.xml a partir dos slugs em src/data (executado após o build).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const env = existsSync('.env') ? readFileSync('.env', 'utf8') : '';
const site = (process.env.VITE_SITE_URL || (env.match(/^VITE_SITE_URL=(.*)$/m) || [])[1] || '').trim().replace(/\/$/, '');
if (!site) {
  console.warn('[sitemap] VITE_SITE_URL não definido — sitemap não gerado.');
  process.exit(0);
}
const slugs = (file) => [...readFileSync(file, 'utf8').matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const urls = ['/', '/conteudos', '/privacidade', ...slugs('src/data/treatments.ts').map((s) => `/tratamentos/${s}`), ...slugs('src/data/articles.ts').map((s) => `/conteudos/${s}`)];
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((u) => `  <url><loc>${site}${u}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}\n</urlset>\n`;
writeFileSync('dist/sitemap.xml', xml);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
console.log(`[sitemap] ${urls.length} URLs geradas.`);
