import "server-only";

import { handTools } from "@/data/handTools";
import { pneumaticBrassFittings } from "@/data/pneumaticBrassFittings";
import { powerTools } from "@/data/powerTools";
import { measuringInstruments } from "@/data/measuringInstruments";
import { agriTools } from "@/data/agriTools";
import { packingMaterials } from "@/data/packingMaterials";
import { supabase } from "@/lib/supabase";

export type CatalogSearchProduct = {
  id: string;
  name: string;
  code: string;
  slug: string;
  image?: string;
  category?: string;
  brand?: string;
  description?: string;
  specifications?: Record<string, string>;
};

type DatabaseSearchProduct = {
  id: string | number;
  name: string;
  code?: string | null;
  slug?: string | null;
  image?: string | null;
  category?: string | null;
  brand?: string | null;
  description?: string | null;
  specifications?: Record<string, string> | null;
};

export function mergeSearchCatalog(databaseProducts: DatabaseSearchProduct[] = []): CatalogSearchProduct[] {
  const localProducts: CatalogSearchProduct[] = [
    ...handTools,
    ...powerTools,
    ...pneumaticBrassFittings,
    ...measuringInstruments,
    ...agriTools,
    ...packingMaterials,
  ];

  const productsBySlug = new Map(localProducts.map((product) => [product.slug, product]));

  for (const product of databaseProducts) {
    if (!product.slug || !product.name) continue;
    productsBySlug.set(product.slug, {
      id: String(product.id),
      name: product.name,
      code: product.code ?? "",
      slug: product.slug,
      image: product.image ?? undefined,
      category: product.category ?? undefined,
      brand: product.brand ?? undefined,
      description: product.description ?? undefined,
      specifications: product.specifications ?? undefined,
    });
  }

  return [...productsBySlug.values()].sort((first, second) => first.name.localeCompare(second.name));
}

export async function getSearchCatalog(): Promise<CatalogSearchProduct[]> {
  const { data: databaseProducts } = await supabase
    .from("products")
    .select("id, name, code, slug, image, category, brand, description, specifications")
    .order("name");

  return mergeSearchCatalog(databaseProducts ?? []);
}
