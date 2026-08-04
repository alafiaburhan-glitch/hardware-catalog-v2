export type LocalProduct = {
  id: string;
  name: string;
  code: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  brand?: string;
  material?: string;
  size?: string;
  weight?: string;
  box_contents?: string;
  datasheet_url?: string;
  featured?: boolean;
  size_images?: Record<string, string>;
  specifications: Record<string, string>;
  faqs?: Array<{ question: string; answer: string }>;
};

// Code-backed products remain available and indexable even if a database row
// is removed or temporarily unavailable.
export const localProducts: LocalProduct[] = [
  {
    id: "local-wesaf-premium-butane-gas",
    name: "Wesaf Premium Butane Gas",
    code: "WES-BUTANE",
    slug: "wesaf-premium-butane-gas",
    category: "lubricants-sealants",
    description:
      "Wesaf Premium Butane Gas is a 225 g refill for compatible butane-powered torches, burners and workshop tools. Contact Noor Agencies in Coimbatore for current availability.",
    image: "/products/web-catalog/wesaf-butane.jpg",
    brand: "Wesaf",
    material: "Premium butane gas refill",
    size: "225 g",
    weight: "225 g",
    box_contents: "1 Wesaf Premium Butane Gas refill can",
    datasheet_url: "",
    featured: false,
    size_images: {},
    specifications: {
      Type: "Premium butane gas refill",
      Brand: "Wesaf",
      Family: "Workshop consumables",
      Application: "Refilling compatible butane-powered torches, burners and workshop equipment",
      "Suitable For": "Professional maintenance, repair, fabrication, installation and workshop use",
      "Available Sizes": "225 g",
    },
    faqs: [],
  },
];

export function getLocalProduct(slug: string) {
  return localProducts.find((product) => product.slug === slug);
}
