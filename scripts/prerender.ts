import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { seoFor, seoRoutes, type Seo } from "../src/lib/seo.ts";

const dist = join(process.cwd(), "dist");
const base = process.env.VITE_BASE ?? "/";
const origin = (
  process.env.VITE_SITE_URL ?? `http://localhost:5173${base}`
).replace(/\/+$/, "");

const template = await readFile(join(dist, "index.html"), "utf8");

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function headTags(seo: Seo): string {
  const imageAlt = `Portada de ${seo.title}`;
  const tags = [
    `<link rel="canonical" href="${esc(seo.url)}" />`,
    `<meta name="robots" content="${seo.noindex ? "noindex, nofollow" : "index, follow"}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:site_name" content="Zasca! Cómic" />`,
    `<meta property="og:locale" content="es_ES" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(seo.url)}" />`,
    `<meta property="og:image" content="${esc(seo.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(seo.image)}" />`,
    `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    `<meta name="twitter:image:alt" content="${esc(imageAlt)}" />`,
    `<script type="application/ld+json" id="ld-json">${JSON.stringify(
      seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd,
    )}</script>`, 
  ];

  return `\n    ${tags.join("\n    ")}\n  `;
}

function render(seo: Seo): string {
  const withTitle = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${esc(seo.title)}</title>`,
  );
  const withDescription = withTitle.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${esc(seo.description)}" />`,
  );

  return withDescription.replace("</head>", `${headTags(seo)}</head>`);
}

let written = 0;

for (const route of seoRoutes) {
  const html = render(seoFor(route, origin));

  if (route === "/") {
    await writeFile(join(dist, "index.html"), html);
    written += 1;
    continue;
  }

  const file = join(dist, route.slice(1), "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  written += 1;
}

// Fallback de GitHub Pages: sirve la SPA (y su 404) en rutas desconocidas.
await writeFile(join(dist, "404.html"), render(seoFor("/404", origin)));

const sitemapEntries = seoRoutes
  .filter((route) => route !== "/newsletter/confirmado")
  .map((route) => {
    const { url } = seoFor(route, origin);
    return `  <url><loc>${esc(url)}</loc></url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

await writeFile(join(dist, "sitemap.xml"), sitemap);
await writeFile(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);

console.log(
  `Prerender: ${written} rutas + 404, sitemap y robots para ${origin}`,
);
