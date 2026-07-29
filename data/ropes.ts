export type RopeProduct = {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: "ropes";
  description: string;
  image: string;
  material: string;
  specifications: Record<string, string>;
  sizeDetails: Record<string, RopeSizeDetail>;
};

export type RopeSizeDetail = {
  metresPerKg: number;
  coil220Kg?: number;
  coil40Kg?: number;
};

function rope(
  slug: string,
  name: string,
  code: string,
  color: string,
  material: string,
  sizeDetails: Record<string, RopeSizeDetail>,
): RopeProduct {
  return {
    id: `rope-${slug}`,
    name,
    slug,
    code,
    category: "ropes",
    description: `${color} ${material.toLowerCase()} rope for industrial, commercial, packing and general-purpose applications. Select the required diameter and contact Noor Agencies for current availability and a quotation.`,
    image: `/products/ropes/${slug}.png`,
    material,
    sizeDetails,
    specifications: {
      Category: "Ropes",
      Material: material,
      Color: color,
      Construction: "Twisted rope",
      "Available Sizes": Object.keys(sizeDetails).join(", "),
      Application: "Industrial, commercial, packing and general-purpose use",
    },
  };
}

export const ropes: RopeProduct[] = [
  rope(
    "yellow-polypropylene-rope",
    "Yellow Polypropylene Rope",
    "RP-YPP",
    "Yellow",
    "Polypropylene",
    {
      "3 mm": { metresPerKg: 150, coil220Kg: 4 },
      "4 mm": { metresPerKg: 120, coil220Kg: 4 },
      "5 mm": { metresPerKg: 90, coil220Kg: 4 },
      "6 mm": { metresPerKg: 50, coil220Kg: 4 },
      "8 mm": { metresPerKg: 30, coil220Kg: 6.5 },
      "10 mm": { metresPerKg: 20, coil220Kg: 10 },
      "12 mm": { metresPerKg: 13, coil220Kg: 15 },
      "14 mm": { metresPerKg: 10, coil220Kg: 20 },
      "16 mm": { metresPerKg: 8, coil220Kg: 25 },
      "18 mm": { metresPerKg: 6, coil220Kg: 32 },
      "20 mm": { metresPerKg: 5, coil220Kg: 40 },
      "22 mm": { metresPerKg: 4, coil220Kg: 48.5 },
      "24 mm": { metresPerKg: 3, coil220Kg: 57 },
      "28 mm": { metresPerKg: 2.75, coil220Kg: 78 },
      "30 mm": { metresPerKg: 2, coil220Kg: 89 },
      "32 mm": { metresPerKg: 1.8, coil220Kg: 101 },
      "36 mm": { metresPerKg: 1.5, coil220Kg: 129 },
      "40 mm": { metresPerKg: 1, coil220Kg: 158 },
    },
  ),
  rope(
    "brown-polypropylene-rope",
    "Brown Polypropylene Rope",
    "RP-BPP",
    "Brown",
    "Polypropylene",
    {
      "4 mm": { metresPerKg: 100 },
      "5 mm": { metresPerKg: 80 },
      "6 mm": { metresPerKg: 40 },
      "8 mm": { metresPerKg: 25 },
      "10 mm": { metresPerKg: 15 },
      "12 mm": { metresPerKg: 10 },
      "14 mm": { metresPerKg: 8 },
      "16 mm": { metresPerKg: 6 },
      "18 mm": { metresPerKg: 5 },
      "24 mm": { metresPerKg: 2 },
    },
  ),
  rope(
    "white-polyester-rope",
    "White Polyester Rope",
    "RP-WPE",
    "White",
    "Polyester",
    {
      "3 mm": { metresPerKg: 120, coil220Kg: 4, coil40Kg: 0.3 },
      "4 mm": { metresPerKg: 90, coil220Kg: 4 },
      "5 mm": { metresPerKg: 75, coil220Kg: 4 },
      "6 mm": { metresPerKg: 38, coil220Kg: 4, coil40Kg: 1 },
      "8 mm": { metresPerKg: 23, coil220Kg: 9.5, coil40Kg: 1.5 },
      "10 mm": { metresPerKg: 15, coil220Kg: 15, coil40Kg: 2.2 },
      "12 mm": { metresPerKg: 10, coil220Kg: 21.5, coil40Kg: 2.5 },
      "14 mm": { metresPerKg: 8, coil220Kg: 19, coil40Kg: 3.5 },
      "16 mm": { metresPerKg: 6, coil220Kg: 35, coil40Kg: 6 },
      "18 mm": { metresPerKg: 5, coil220Kg: 46 },
      "20 mm": { metresPerKg: 4, coil220Kg: 57, coil40Kg: 7.5 },
      "24 mm": { metresPerKg: 2.5, coil220Kg: 78 },
    },
  ),
];

export function getRope(slug: string) {
  return ropes.find((product) => product.slug === slug);
}
