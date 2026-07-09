export type CategoryBrand = {
  name: string;
  slug: string;
  description: string;
  image?: string;
  matchTerms: string[];
};

export const categoryBrandGroups: Record<string, CategoryBrand[]> = {
  "industrial-adhesives-sealants": [
    {
      name: "Loctite",
      slug: "loctite",
      description: "Threadlockers, instant adhesives, retaining compounds, and sealants.",
      image: "/products/locite.jpg",
      matchTerms: ["loctite", "loc-"],
    },
  ],
};

export function getCategoryBrands(categorySlug: string) {
  return categoryBrandGroups[categorySlug.trim()] ?? [];
}

export function getCategoryBrand(categorySlug: string, brandSlug: string) {
  return getCategoryBrands(categorySlug).find((brand) => brand.slug === brandSlug.trim());
}

export function productMatchesBrand(
  product: { name?: string | null; code?: string | null; brand?: string | null },
  brand: CategoryBrand
) {
  const searchable = `${product.brand ?? ""} ${product.name ?? ""} ${product.code ?? ""}`.toLowerCase();
  return brand.matchTerms.some((term) => searchable.includes(term.toLowerCase()));
}
