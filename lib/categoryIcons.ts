const categoryIcons: Record<string, string> = {
  "emery-paper": "/category-icons/emery-papers.png",
  "emery-papers": "/category-icons/emery-papers.png",
  "emery-roll": "/category-icons/emery-roll.png",
  "emery-rolls": "/category-icons/emery-roll.png",
  "hand-tools": "/category-icons/hand-tools.png",
  "power-tools": "/category-icons/power-tools.png",
  ropes: "/category-icons/ropes.png",
  hoses: "/category-icons/hoses.png",
  "safety-products": "/category-icons/safety-products.png",
  "lifting-equipment": "/category-icons/lifting-equipment.png",
  "lifting-equipments": "/category-icons/lifting-equipments.png",
  "lifting-slings": "/category-icons/lifting-slings.png",
  "shade-nets": "/category-icons/shade-nets.png",
  tarpaulins: "/category-icons/tarpaulins.png",
  ladders: "/category-icons/ladders-sections.png",
  "ladders-sections": "/category-icons/ladders-sections.png",
  "heat-insulation": "/category-icons/heat-insulation.png",
  "industrial-adhesives": "/category-icons/industrial-adhesives.png",
  "industrial-adhesives-sealants": "/category-icons/industrial-adhesives-sealants.png",
  "lubricants-sealants": "/category-icons/lubricants-sealants.png",
  "packaging-material": "/category-icons/packaging-material.png",
  tapes: "/category-icons/tapes.png",
  "pneumatic-brass-fittings": "/category-icons/pneumatic-brass-fittings.png",
  "measuring-instruments": "/category-icons/measuring-instruments-red.png",
  "agri-tools": "/category-icons/agri-tools.png",
};

export function getCategoryIcon(category?: string | null): string | undefined {
  if (!category) return undefined;
  return categoryIcons[category.trim().toLowerCase()];
}
