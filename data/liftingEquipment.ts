const webbingSlingCapacityImages: Record<string, string> = {
  "1TON": "/products/lifting-equipment/webbing-sling-1-ton-purple.webp",
  "2TON": "/products/lifting-equipment/webbing-sling-2-ton-green.webp",
  "3TON": "/products/lifting-equipment/webbing-sling-3-ton-yellow.webp",
  "4TON": "/products/lifting-equipment/webbing-sling-4-ton-grey.webp",
  "5TON": "/products/lifting-equipment/webbing-sling-5-ton-red.webp",
  "6TON": "/products/lifting-equipment/webbing-sling-6-ton-brown.webp",
  "8TON": "/products/lifting-equipment/webbing-sling-8-ton-blue.webp",
  "10TON": "/products/lifting-equipment/webbing-sling-10-ton-orange.webp",
  "12TON": "/products/lifting-equipment/webbing-sling-12-ton-orange.webp",
};

export const liftingEquipment = [
  {
    id: "lifting-webbing-sling",
    name: "Webbing Sling",
    code: "WEBB-SLING",
    slug: "webbing-sling",
    category: "lifting-equipments",
    description:
      "Eye-to-eye polyester webbing sling for lifting, rigging and material handling. Capacity colours follow EN 1492-1 identification conventions; always verify the sewn WLL label before use.",
    image: webbingSlingCapacityImages["1TON"],
    material: "High-tenacity polyester",
    size: "",
    weight: "",
    box_contents: "1 eye-to-eye webbing sling",
    datasheet_url: "",
    featured: true,
    size_images: webbingSlingCapacityImages,
    specifications: {
      Application: "Lifting, rigging, loading and material handling",
      "Available Capacity": "1TON, 2TON, 3TON, 4TON, 5TON, 6TON, 8TON, 10TON, 12TON",
      "Available Length": "1MTR, 2MTR, 3MTR, 4MTR, 5MTR, 6MTR, 8MTR, 10MTR, 12MTR",
      "Capacity Colour":
        "1 ton: Purple; 2 ton: Green; 3 ton: Yellow; 4 ton: Grey; 5 ton: Red; 6 ton: Brown; 8 ton: Blue; 10 ton and above: Orange",
      Standard: "Colour identification convention based on EN 1492-1",
    },
    faqs: [],
  },
];

export function getLiftingEquipment(slug: string) {
  return liftingEquipment.find((product) => product.slug === slug);
}
