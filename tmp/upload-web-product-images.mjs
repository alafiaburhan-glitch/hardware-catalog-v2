import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i), line.slice(i + 1).replace(/^["']|["']$/g, "")];
    }),
);
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const folder = path.join("public", "products", "web-catalog");

const mappings = {
  "abro-pu-foam.png": ["abro-pu-foam"],
  "anabond-range.jpg": ["anabond-666t", "anabond-666-blue", "anabond-rtv-red", "anabond-666-clear-silicone", "anabond-112-red", "anabond-122-blue", "anabond-412-red", "anabond-202"],
  "m-seal-range.jpg": ["m-seal-phataphat", "m-seal-general-purpose", "m-seal-ezyseal", "m-seal-sanitary-white", "m-seal-pvc-solvent-cement", "m-seal-upvc-solvent-cement", "m-seal-cpvc-solvent-cement"],
  "dendrite-pc-65.webp": ["dendrite-pc-65"],
  "flex-kwik.webp": ["flex-kwik"],
  "holdtite-pvc-solvent.jpg": ["holdite-pvc-solvent-cement"],
  "aerol-dpt-kit.jpg": ["aerol-dye-penetrant-cleaner", "aerol-dye-penetrant", "aerol-dye-penetrant-developer"],
  "rustlick-631.jpg": ["rustlick-631"],
  "rustolene.jpg": ["rustolene"],
  "wesaf-butane.jpg": ["wesaf-premium-butane-gas"],
  "star-gel.jpg": ["star-gel"],
  "dklog.webp": ["dklog-40g"],
  "fevikwik.jpg": ["fevikwik"],
  "spatter-nixe.jpg": ["spatter-nixe"],
  "aerol-moly-spray.jpg": ["aerol-moly-spray"],
  "aerol-zinc-spray.jpg": ["aerol-zinc-spray"],
  "wesaf-silicone-release-exact.jpg": ["wesaf-silicone-release-spray"],
  "aerol-corrogard-wax.jpg": ["aerol-corrogard-wax-spray"],
};

const uploadOnly = new Set([
  "aerol-corrogard-wax.jpg",
]);

const updated = [];
for (const [fileName, slugs] of Object.entries(mappings)) {
  if (!uploadOnly.has(fileName)) continue;
  const extension = path.extname(fileName).slice(1);
  const contentType = extension === "png" ? "image/png" : extension === "webp" ? "image/webp" : "image/jpeg";
  const storagePath = `web-catalog/${fileName}`;
  const { error: uploadError } = await supabase.storage.from("products").upload(
    storagePath,
    fs.readFileSync(path.join(folder, fileName)),
    { contentType, cacheControl: "31536000", upsert: true },
  );
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from("products").getPublicUrl(storagePath);
  const { error: updateError } = await supabase.from("products").update({ image: data.publicUrl }).in("slug", slugs);
  if (updateError) throw updateError;
  updated.push(...slugs);
}

const { error: starGelError } = await supabase.from("products").update({
  category: "lubricants-sealants",
  material: "Stainless-steel pickling and weld-cleaning gel",
  description: "Star Gel is an industrial pickling and weld-cleaning gel for removing heat tint, weld discoloration, oxide scale, rust particles and surface contamination from compatible stainless-steel surfaces. Available sizes: 100 g, 250 g, 1 kg.",
  specifications: {
    Brand: "Star Gel",
    Type: "Stainless-steel pickling and weld-cleaning gel",
    Family: "Metal treatment chemicals",
    Application: "Cleaning stainless-steel weld joints and fabricated surfaces",
    "Available Sizes": "100 g, 250 g, 1 kg",
    "Suitable For": "Professional stainless-steel fabrication, welding and maintenance use",
  },
}).eq("slug", "star-gel");
if (starGelError) throw starGelError;

console.log(JSON.stringify({ updated, corrected: ["star-gel"] }, null, 2));
