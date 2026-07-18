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
    image: "/products/lifting-equipment/webbing-sling-all-colours.webp",
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
  {
    id: "lifting-ratchet-lashing",
    name: "Ratchet Lashing",
    code: "RACH-LASH",
    slug: "ratchet-lash",
    category: "lifting-equipments",
    description:
      "Heavy-duty polyester ratchet lashing for cargo securing, transport tie-down, bundling and load restraint.",
    image: "/products/lifting-equipment/ratchet-lashing.webp",
    material: "High-tenacity polyester webbing with zinc-plated steel hardware",
    size: "",
    weight: "",
    box_contents: "1 complete ratchet lashing set",
    datasheet_url: "",
    featured: false,
    size_images: {},
    specifications: {
      Application: "Cargo securing, transport tie-down and load restraint",
      "Available Width": "25mm, 50mm, 75mm",
      "Available Length": "4MTR, 6MTR, 8MTR, 10MTR, 12MTR, 15MTR",
    },
    faqs: [],
  },
  {
    id: "lifting-magnetic-lifter",
    name: "Magnetic Lifter",
    code: "MAGN-LIFT",
    slug: "magnetic-lifter",
    category: "lifting-equipments",
    description:
      "Permanent magnetic lifter for handling flat ferrous plates, blocks, dies and machined components without external power.",
    image: "/products/lifting-equipment/magnetic-lifter.webp",
    material: "Permanent magnet assembly with steel housing",
    size: "",
    weight: "",
    box_contents: "1 magnetic lifter",
    datasheet_url: "",
    featured: false,
    size_images: {},
    specifications: {
      Application: "Steel plate lifting, machine-shop handling and fabrication",
      "Available Capacity": "200KG, 400KG, 600KG",
    },
    faqs: [],
  },
  {
    id: "lifting-anti-abrasive-sleeve",
    name: "Anti-Abrasive Sleeve",
    code: "ABBR-SLEEVE",
    slug: "anti-abrasive-sleeve",
    category: "lifting-equipments",
    description:
      "Protective sleeve that helps shield webbing slings from cuts, edge wear and surface abrasion during lifting and handling.",
    image: "/products/lifting-equipment/anti-abrasive-sleeve.webp",
    material: "Abrasion-resistant woven polyester",
    size: "",
    weight: "",
    box_contents: "1 anti-abrasive sling sleeve",
    datasheet_url: "",
    featured: false,
    size_images: {},
    specifications: {
      Application: "Sling protection, edge protection and abrasion resistance",
      "Available Capacity": "2TON, 3TON, 4TON, 5TON, 6TON",
    },
    faqs: [],
  },
];

export function getLiftingEquipment(slug: string) {
  return liftingEquipment.find((product) => product.slug === slug);
}
