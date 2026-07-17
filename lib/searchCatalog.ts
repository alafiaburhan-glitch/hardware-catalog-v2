import "server-only";

import { handTools } from "@/data/handTools";
import { pneumaticBrassFittings } from "@/data/pneumaticBrassFittings";
import { powerTools } from "@/data/powerTools";
import { measuringInstruments } from "@/data/measuringInstruments";
import { agriTools } from "@/data/agriTools";
import { supabase } from "@/lib/supabase";

export type CatalogSearchProduct = {
  id: string;
  name: string;
  code: string;
  slug: string;
  image?: string;
  category?: string;
};

export async function getSearchCatalog(): Promise<CatalogSearchProduct[]> {
  const localProducts: CatalogSearchProduct[] = [
    ...handTools,
    ...powerTools,
    ...pneumaticBrassFittings,
    ...measuringInstruments,
    ...agriTools,
  ];
  const { data: databaseProducts } = await supabase
    .from("products")
    .select("id, name, code, slug, image, category")
    .order("name");

  const productsBySlug = new Map(
    localProducts.map((product) => [product.slug, product]),
  );

  for (const product of databaseProducts ?? []) {
    if (!product.slug || !product.name) continue;
    productsBySlug.set(product.slug, {
      id: String(product.id),
      name: product.name,
      code: product.code ?? "",
      slug: product.slug,
      image: product.image ?? undefined,
      category: product.category ?? undefined,
    });
  }

  return [...productsBySlug.values()].sort((first, second) =>
    first.name.localeCompare(second.name),
  );
}
