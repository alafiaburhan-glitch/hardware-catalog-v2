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
};

function rope(
  slug: string,
  name: string,
  code: string,
  color: string,
  material: string,
  sizes: string,
  metresPerKg: string,
  coilWeights: string,
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
    specifications: {
      Category: "Ropes",
      Material: material,
      Color: color,
      Construction: "Twisted rope",
      "Available Sizes": sizes,
      "Metres per Kilogram": metresPerKg,
      "Approx. Weight of 220 m Coil": coilWeights,
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
    "3 mm, 4 mm, 5 mm, 6 mm, 8 mm, 10 mm, 12 mm, 14 mm, 16 mm, 18 mm, 20 mm, 22 mm, 24 mm, 28 mm, 30 mm, 32 mm, 36 mm, 40 mm",
    "3 mm: 150; 4 mm: 120; 5 mm: 90; 6 mm: 50; 8 mm: 30; 10 mm: 20; 12 mm: 13; 14 mm: 10; 16 mm: 8; 18 mm: 6; 20 mm: 5; 22 mm: 4; 24 mm: 3; 28 mm: 2.75; 30 mm: 2; 32 mm: 1.8; 36 mm: 1.5; 40 mm: 1",
    "3–6 mm: 4 kg; 8 mm: 6.5 kg; 10 mm: 10 kg; 12 mm: 15 kg; 14 mm: 20 kg; 16 mm: 25 kg; 18 mm: 32 kg; 20 mm: 40 kg; 22 mm: 48.5 kg; 24 mm: 57 kg; 28 mm: 78 kg; 30 mm: 89 kg; 32 mm: 101 kg; 36 mm: 129 kg; 40 mm: 158 kg",
  ),
  rope(
    "brown-polypropylene-rope",
    "Brown Polypropylene Rope",
    "RP-BPP",
    "Brown",
    "Polypropylene",
    "4 mm, 5 mm, 6 mm, 8 mm, 10 mm, 12 mm, 14 mm, 16 mm, 18 mm, 24 mm",
    "4 mm: 100; 5 mm: 80; 6 mm: 40; 8 mm: 25; 10 mm: 15; 12 mm: 10; 14 mm: 8; 16 mm: 6; 18 mm: 5; 24 mm: 2",
    "Contact Noor Agencies for coil-weight details",
  ),
  rope(
    "white-polyester-rope",
    "White Polyester Rope",
    "RP-WPE",
    "White",
    "Polyester",
    "3 mm, 4 mm, 5 mm, 6 mm, 8 mm, 10 mm, 12 mm, 14 mm, 16 mm, 18 mm, 20 mm, 24 mm",
    "3 mm: 120; 4 mm: 90; 5 mm: 75; 6 mm: 38; 8 mm: 23; 10 mm: 15; 12 mm: 10; 14 mm: 8; 16 mm: 6; 18 mm: 5; 20 mm: 4; 24 mm: 2.5",
    "3–6 mm: 4 kg; 8 mm: 9.5 kg; 10 mm: 15 kg; 12 mm: 21.5 kg; 14 mm: 19 kg; 16 mm: 35 kg; 18 mm: 46 kg; 20 mm: 57 kg; 24 mm: 78 kg",
  ),
];

export function getRope(slug: string) {
  return ropes.find((product) => product.slug === slug);
}
