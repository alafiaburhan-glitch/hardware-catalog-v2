const INDUSTRIAL_ADHESIVE_FAMILY_IMAGES = [
  {
    image: "/products/anabond.jpg",
    matchTerms: ["anabond", "ana-"],
  },
  {
    image: "/products/mseal family photo.jpg",
    matchTerms: ["m-seal", "mseal", "mse-"],
  },
] as const;

type ProductImageInput = {
  name?: string | null;
  code?: string | null;
  brand?: string | null;
  category?: string | null;
  image?: string | null;
};

export function getProductFamilyImage(product: ProductImageInput) {
  if (product.category !== "industrial-adhesives-sealants") {
    return product.image?.trim() || undefined;
  }

  const searchable = `${product.brand ?? ""} ${product.name ?? ""} ${product.code ?? ""}`.toLowerCase();
  const familyImage = INDUSTRIAL_ADHESIVE_FAMILY_IMAGES.find(({ matchTerms }) =>
    matchTerms.some((term) => searchable.includes(term)),
  );

  return familyImage?.image ?? product.image?.trim() ?? undefined;
}
