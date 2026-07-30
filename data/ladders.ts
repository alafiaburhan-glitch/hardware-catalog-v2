export type LadderProduct = {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: "ladders-sections";
  description: string;
  image: string;
  specifications: Record<string, string>;
};

export const ladders: LadderProduct[] = [
  {
    id: "ladder-aluminium",
    name: "Aluminium Ladder",
    slug: "aluminium-ladder",
    code: "LAD-AL",
    category: "ladders-sections",
    description:
      "Lightweight, corrosion-resistant aluminium step ladder for maintenance, commercial and general-purpose use. Select the required number of steps and contact Noor Agencies for current availability and a quotation.",
    image: "/products/ladders/aluminium-ladder.png",
    specifications: {
      Category: "Step Ladder",
      Material: "Aluminium",
      "Available Steps": "4 Steps, 5 Steps, 6 Steps, 7 Steps, 8 Steps, 10 Steps, 12 Steps",
      Features: "Anti-slip steps, safety platform and non-marking feet",
      Application: "Maintenance, commercial and general-purpose use",
    },
  },
  {
    id: "ladder-telescopic",
    name: "Telescopic Ladder",
    slug: "telescopic-ladder",
    code: "LAD-TL",
    category: "ladders-sections",
    description:
      "Compact aluminium telescopic ladder with secure rung locks for maintenance, access and portable work requirements. Select the required number of steps and contact Noor Agencies for current availability and a quotation.",
    image: "/products/ladders/telescopic-ladder.png",
    specifications: {
      Category: "Telescopic Ladder",
      Material: "Aluminium",
      "Available Steps": "9 Steps, 11 Steps, 13 Steps, 15 Steps",
      Features: "Independent rung locks, compact storage and anti-slip feet",
      Application: "Maintenance, access and portable work",
    },
  },
];

export function getLadder(slug: string) {
  return ladders.find((product) => product.slug === slug);
}
