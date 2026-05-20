import { Product } from "@/types/product";
const products: Product[] = [
  {
    id: 1,
    name: "Adjustable Spanner",
    slug: "adjustable-spanner",
    code: "HT001",
    category: "hand-tools",

    description:
      "Heavy-duty industrial adjustable spanner designed for workshop and commercial applications.",

    image: "/products/spanner.jpg",

    specifications: {
      material: "Chrome Vanadium Steel",
      size: "12 inch",
      usage: "Industrial",
    },
  },

  {
    id: 2,
    name: "Hammer Drill",
    slug: "hammer-drill",
    code: "PT001",
    category: "power-tools",

    description:
      "Professional hammer drill suitable for industrial construction applications.",

    image: "/products/drill.jpg",

    specifications: {
      power: "1200W",
      voltage: "220V",
      usage: "Construction",
    },
  },

  {
    id: 3,
    name: "Safety Rope",
    slug: "safety-rope",
    code: "RP001",
    category: "ropes",

    description:
      "Industrial safety rope designed for lifting and protection applications.",

    image: "/products/rope.jpg",

    specifications: {
      material: "Polypropylene",
      length: "50 meters",
      usage: "Safety & Lifting",
    },
  },
];

export default products;