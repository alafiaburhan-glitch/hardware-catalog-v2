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

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
);

const imageDirectory = path.join(root, "public", "products", "generated-na-stock");
const files = (await fs.readdir(imageDirectory))
  .filter((file) => file.endsWith(".png"))
  .sort();

const { data: catalogProducts, error: readError } = await supabase
  .from("products")
  .select("id,slug")
  .in("slug", files.map((file) => path.basename(file, ".png")));
if (readError) throw readError;

const productsBySlug = new Map(catalogProducts.map((item) => [item.slug, item]));
const missingProducts = files
  .map((file) => path.basename(file, ".png"))
  .filter((slug) => !productsBySlug.has(slug));
if (missingProducts.length) {
  throw new Error(`Catalog products not found: ${missingProducts.join(", ")}`);
}

async function upload(file) {
  const slug = path.basename(file, ".png");
  const bytes = await fs.readFile(path.join(imageDirectory, file));
  const storagePath = `generated-na-stock/${file}`;
  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(storagePath, bytes, {
      contentType: "image/png",
      cacheControl: "31536000",
      upsert: true,
    });
  if (uploadError) throw new Error(`${slug} upload: ${uploadError.message}`);

  const { data: publicUrlData } = supabase.storage
    .from("products")
    .getPublicUrl(storagePath);
  const { error: updateError } = await supabase
    .from("products")
    .update({ image: publicUrlData.publicUrl, size_images: {} })
    .eq("id", productsBySlug.get(slug).id);
  if (updateError) throw new Error(`${slug} update: ${updateError.message}`);

  return { slug, image: publicUrlData.publicUrl };
}

const uploaded = [];
const concurrency = 4;
for (let index = 0; index < files.length; index += concurrency) {
  uploaded.push(...await Promise.all(files.slice(index, index + concurrency).map(upload)));
  console.log(`Uploaded ${uploaded.length}/${files.length}`);
}

console.log(JSON.stringify({ uploaded: uploaded.length }, null, 2));
