import fs from "node:fs/promises";
import path from "node:path";

const sources = [
  {
    key: "anabond-range",
    page: "https://helloentrepreneurs.com/brand-saga/ensuring-strong-and-durable-bonds-with-anabond-products-22298/",
  },
  {
    key: "m-seal-range",
    direct: "https://assets.pidilite.com/is/image/pidilite/Mseal-story-2001?dpr=off&ts=1716187903300",
  },
  {
    key: "dendrite-pc-65",
    page: "https://www.shamsitraders.co.in/product/31531195/Dendrite-PC-65",
  },
  {
    key: "flex-kwik",
    page: "https://www.abgallery.in/products/pidilite-flex-kwik-instant-adhesive-flex-bonding-20-gram",
  },
  {
    key: "holdtite-pvc-solvent",
    page: "https://www.toolbuy.com/tp/holdtite-leakguard-50-ml-tin-regular-body-pvc-solvent-cement-pack-of-100-pcs",
  },
  {
    key: "aerol-dpt-kit",
    direct: "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/ExtraLarge/aerol-dye-penetrant-test-kit-20241219194753585.jpg",
  },
  {
    key: "rustlick-631",
    direct: "https://lntsufin.com/storage/mediafiles/catalog/live/16333-424/original/16333-424_image_0.jpg",
  },
  {
    key: "rustolene",
    direct: "https://cdn.moglix.com/p/kGAqY2QqoWV5a-xxlarge.jpg",
  },
  {
    key: "wesaf-silicone-release",
    page: "https://www.industrybuying.com/silicone-spray-wesaf-FAM197654",
  },
  {
    key: "wesaf-butane",
    page: "https://www.wesaf.co.in/butane-gas.html",
  },
  {
    key: "star-gel",
    page: "https://www.krystalsurfacesolution.com/star-gel-weld-cleaning-gel.html",
  },
  {
    key: "dklog",
    page: "https://www.industrybuying.com/industrial-cleaners-essentials-d-klog-CLE.IND.521614284",
  },
  {
    key: "abro-pu-foam",
    direct: "https://abro.com/wp-content/uploads/2021/07/PU-750-600x600.png",
  },
  {
    key: "fevikwik",
    direct: "https://assets.pidilite.com/is/image/pidilite/fevikwik-website-pro-gel-advanced?dpr=off&ts=1781507973048",
  },
  {
    key: "spatter-nixe",
    direct: "https://5.imimg.com/data5/EP/AJ/MY-3030401/water-based-anti-spatter-spray-500x500.jpg",
  },
  {
    key: "aerol-moly-spray",
    direct: "https://5.imimg.com/data5/SELLER/Default/2023/9/341444149/ZP/OO/XJ/1734694/aerol-moly-spray-grade-2010-300g-466ml-500x500.jpg",
  },
  {
    key: "aerol-zinc-spray",
    direct: "https://5.imimg.com/data5/SELLER/Default/2025/6/520239004/GD/TW/XZ/1734694/aerol-zinc-spray-grade-3060-3070-350g-493-ml-500x500.jpg",
  },
  {
    key: "wesaf-silicone-release-exact",
    direct: "https://5.imimg.com/data5/SELLER/Default/2025/12/569054758/II/IS/YQ/4250201/silicone-release-spray-1-500x500.jpg",
  },
  {
    key: "aerol-corrogard-wax",
    direct: "https://cdn.moglix.com/p/QGbE6tX1UkLSF-xxlarge.jpg",
  },
];

const output = path.join("public", "products", "web-catalog");
await fs.mkdir(output, { recursive: true });

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&#39;", "'").replaceAll("&quot;", '"');
}

async function resolveImage(source) {
  if (source.direct) return source.direct;
  const response = await fetch(source.page, { headers: { "user-agent": "Mozilla/5.0" }, redirect: "follow" });
  if (!response.ok) throw new Error(`${source.key} page: HTTP ${response.status}`);
  const html = await response.text();
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)/i,
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return new URL(decodeHtml(match[1]), response.url).href;
  }
  throw new Error(`${source.key}: no social image found`);
}

const results = [];
for (const source of sources) {
  try {
    const imageUrl = await resolveImage(source);
    const response = await fetch(imageUrl, { headers: { "user-agent": "Mozilla/5.0", accept: "image/*" }, redirect: "follow" });
    if (!response.ok) throw new Error(`image HTTP ${response.status}`);
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) throw new Error(`unexpected content type ${contentType}`);
    const extension = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
    const fileName = `${source.key}.${extension}`;
    await fs.writeFile(path.join(output, fileName), Buffer.from(await response.arrayBuffer()));
    results.push({ key: source.key, fileName, imageUrl, sourcePage: source.page ?? source.direct });
  } catch (error) {
    results.push({ key: source.key, error: error.message, sourcePage: source.page ?? source.direct });
  }
}
await fs.writeFile(path.join(output, "sources.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
