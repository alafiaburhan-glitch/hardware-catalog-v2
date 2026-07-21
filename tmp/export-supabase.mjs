import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const root = process.cwd();
const envText = await fs.readFile(path.join(root, ".env.local"), "utf8");
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const separator = line.indexOf("=");
      return [line.slice(0, separator), line.slice(separator + 1)];
    }),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) throw new Error("Missing Supabase URL or anonymous key in .env.local");

const client = createClient(url, key, { auth: { persistSession: false } });
const stamp = new Date().toISOString().replaceAll(":", "-").replace(/\.\d{3}Z$/, "Z");
const requestedExport = process.argv[2];
const exportRoot = requestedExport
  ? path.resolve(root, requestedExport)
  : path.join(root, "exports", `supabase-${stamp}`);
const imageRoot = path.join(exportRoot, "images");
await fs.mkdir(imageRoot, { recursive: true });

const tables = {};
for (const table of ["categories", "products"]) {
  if (requestedExport) {
    tables[table] = JSON.parse(await fs.readFile(path.join(exportRoot, `${table}.json`), "utf8"));
  } else {
    const { data, error } = await client.from(table).select("*");
    if (error) throw new Error(`${table}: ${error.message}`);
    tables[table] = data ?? [];
    await fs.writeFile(path.join(exportRoot, `${table}.json`), `${JSON.stringify(data ?? [], null, 2)}\n`);
  }
}

const urls = new Set();
for (const product of tables.products) {
  if (typeof product.image === "string" && product.image.startsWith("http")) urls.add(product.image);
  if (product.size_images && typeof product.size_images === "object") {
    for (const value of Object.values(product.size_images)) {
      if (typeof value === "string" && value.startsWith("http")) urls.add(value);
    }
  }
}

const manifest = [];
let index = 0;
for (const imageUrl of urls) {
  index += 1;
  try {
    const parsed = new URL(imageUrl);
    const originalName = decodeURIComponent(path.basename(parsed.pathname)) || `image-${index}`;
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "-");
    const fileName = `${String(index).padStart(4, "0")}-${safeName}`;
    const destination = path.join(imageRoot, fileName);
    try {
      await fs.access(destination);
      manifest.push({ url: imageUrl, file: `images/${fileName}`, status: "downloaded" });
      continue;
    } catch {}
    const response = await fetch(imageUrl, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
    manifest.push({ url: imageUrl, file: `images/${fileName}`, status: "downloaded" });
  } catch (error) {
    manifest.push({ url: imageUrl, status: "failed", error: error instanceof Error ? error.message : String(error) });
  }
  await fs.writeFile(path.join(exportRoot, "image-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
}

await fs.writeFile(path.join(exportRoot, "image-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await fs.writeFile(
  path.join(exportRoot, "export-summary.json"),
  `${JSON.stringify({ exportedAt: new Date().toISOString(), categories: tables.categories.length, products: tables.products.length, referencedImages: urls.size, downloadedImages: manifest.filter((item) => item.status === "downloaded").length, failedImages: manifest.filter((item) => item.status === "failed").length }, null, 2)}\n`,
);

console.log(exportRoot);
console.log(JSON.stringify({ categories: tables.categories.length, products: tables.products.length, referencedImages: urls.size, downloadedImages: manifest.filter((item) => item.status === "downloaded").length, failedImages: manifest.filter((item) => item.status === "failed").length }, null, 2));
