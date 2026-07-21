const categoryAliases: Record<string, string> = {
  "emery-paper": "emery-papers",
  "lifting-equipment": "lifting-equipments",
  "packing-material": "packaging-material",
};

export function normalizeCategoryIdentifier(value: unknown) {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return categoryAliases[normalized] ?? normalized;
}

export function productBelongsToCategory(
  productCategory: unknown,
  category: { id?: unknown; name?: unknown; slug?: unknown },
) {
  const productIdentifier = normalizeCategoryIdentifier(productCategory);
  const categoryIdentifiers = [category.id, category.name, category.slug]
    .map(normalizeCategoryIdentifier)
    .filter(Boolean);

  return categoryIdentifiers.includes(productIdentifier);
}
