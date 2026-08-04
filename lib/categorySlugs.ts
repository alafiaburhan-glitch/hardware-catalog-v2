const CATEGORY_SLUG_ALIASES: Readonly<Record<string, string>> = {
  "emery-paper": "emery-abrasives",
  "emery-papers": "emery-abrasives",
  "emery-roll": "emery-abrasives",
  "emery-rolls": "emery-abrasives",
  "packing-material": "packaging-material",
};

export function normalizeCategorySlug(slug: string) {
  const trimmedSlug = slug.trim();
  return CATEGORY_SLUG_ALIASES[trimmedSlug] ?? trimmedSlug;
}
