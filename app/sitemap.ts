import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { pneumaticBrassFittings } from "@/data/pneumaticBrassFittings";
import { measuringInstruments } from "@/data/measuringInstruments";
import { agriTools } from "@/data/agriTools";
import { packingMaterials } from "@/data/packingMaterials";

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

  const categoryPages =
    categories?.filter((category) => category.slug?.trim()).map((category) => ({
      url: `${baseUrl}/categories/${category.slug.trim()}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) ?? [];

  if (!categoryPages.some((category) => category.url.endsWith("/pneumatic-brass-fittings"))) {
    categoryPages.push({
      url: `${baseUrl}/categories/pneumatic-brass-fittings`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
  }
  if (!categoryPages.some((category) => category.url.endsWith("/measuring-instruments"))) {
    categoryPages.push({
      url: `${baseUrl}/categories/measuring-instruments`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
  }
  if (!categoryPages.some((category) => category.url.endsWith("/agri-tools"))) {
    categoryPages.push({ url: `${baseUrl}/categories/agri-tools`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 });
  }

  const productPages =
    products?.filter((product) => product.slug?.trim()).map((product) => ({
      url: `${baseUrl}/products/${product.slug.trim()}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) ?? [];

  const knownProductUrls = new Set(productPages.map((product) => product.url));
  for (const product of [...pneumaticBrassFittings, ...measuringInstruments, ...agriTools, ...packingMaterials]) {
    const url = `${baseUrl}/products/${product.slug}`;
    if (!knownProductUrls.has(url)) {
      productPages.push({ url, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 });
    }
  }

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
  ];
}
