import { agriTools } from "@/data/agriTools";

export const dynamic = "force-static";

const BASE_URL = "https://www.nooragencies.in";

function urlEntry(path: string, priority: string) {
  return [
    "  <url>",
    `    <loc>${BASE_URL}${path}</loc>`,
    "    <changefreq>monthly</changefreq>",
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

export function GET() {
  const entries = [
    urlEntry("/categories/agri-tools", "0.9"),
    ...agriTools.map((product) => urlEntry(`/products/${product.slug}`, "0.8")),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
