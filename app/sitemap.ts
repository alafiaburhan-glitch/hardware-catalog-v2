import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { pneumaticBrassFittings } from "@/data/pneumaticBrassFittings";
import { measuringInstruments } from "@/data/measuringInstruments";
import { agriTools } from "@/data/agriTools";
import { packingMaterials } from "@/data/packingMaterials";
import { ropes } from "@/data/ropes";
import { handTools } from "@/data/handTools";
import { powerTools } from "@/data/powerTools";
import { liftingEquipment } from "@/data/liftingEquipment";
import { ladders } from "@/data/ladders";
import { localProducts } from "@/data/localProducts";
import { normalizeCategorySlug } from "@/lib/categorySlugs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.nooragencies.in";

  const { data: categories } = await supabase
    .from("categories")
    .select("slug");

  const { data: products } = await supabase
    .from("products")
    .select("slug");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const categorySlugs = new Set(
    categories
      ?.map((category) => normalizeCategorySlug(category.slug ?? ""))
      .filter(Boolean) ?? [],
  );
  for (const requiredCategory of [
    "agri-tools",
    "measuring-instruments",
    "pneumatic-brass-fittings",
  ]) {
    categorySlugs.add(requiredCategory);
  }

  const categoryPages: MetadataRoute.Sitemap = Array.from(categorySlugs).map((slug) => ({
      url: `${baseUrl}/categories/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const productPages: MetadataRoute.Sitemap =
    products?.filter((product) => product.slug?.trim()).map((product) => ({
      url: `${baseUrl}/products/${product.slug.trim()}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) ?? [];

  const knownProductUrls = new Set(productPages.map((product) => product.url));
  const catalogProducts = [
    ...localProducts,
    ...handTools,
    ...powerTools,
    ...pneumaticBrassFittings,
    ...measuringInstruments,
    ...agriTools,
    ...packingMaterials,
    ...liftingEquipment,
    ...ropes,
    ...ladders,
  ];
  for (const product of catalogProducts) {
    const url = `${baseUrl}/products/${product.slug}`;
    if (!knownProductUrls.has(url)) {
      const image = product.image
        ? product.image.startsWith("http") ? product.image : `${baseUrl}${product.image}`
        : undefined;
      productPages.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        images: image ? [image] : undefined,
      });
      knownProductUrls.add(url);
    }
  }

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
  ];
}
