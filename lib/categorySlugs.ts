const CATEGORY_SLUG_ALIASES: Readonly<Record<string, string>> = {
  "emery-paper": "emery-abrasives",
  "emery-papers": "emery-abrasives",
  "emery-roll": "emery-abrasives",
  "emery-rolls": "emery-abrasives",
  "industrial-adhesives": "industrial-adhesives-sealants",
  "ladders": "ladders-sections",
  "lifting-equipment": "lifting-equipments",
  "packing-material": "packaging-material",
  "tarpaulins": "tarpaulins",
};

export function normalizeCategorySlug(slug: string) {
  const trimmedSlug = slug.trim();
  return CATEGORY_SLUG_ALIASES[trimmedSlug] ?? trimmedSlug;
}
