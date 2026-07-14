export type CategoryBrand = {
  name: string;
  slug: string;
  description: string;
  image?: string;
  matchTerms: string[];
};

export const categoryBrandGroups: Record<string, CategoryBrand[]> = {
  "hand-tools": [
    {
      name: "Spanners",
      slug: "spanners-wrenches",
      description: "Adjustable, open jaw, ring, combination, T, pipe and torque spanners.",
      image: "/products/spanner.jpg",
      matchTerms: ["wrench", "spanner", "xl-spanner"],
    },
    {
      name: "Hammers",
      slug: "hammers-mallets",
      description: "Nylon, rubber, sledge, ball pein, claw and soft-faced hammers.",
      image: "/products/hand-tools/image8.png",
      matchTerms: ["hammer", "mallet", "xl-hammer"],
    },
    {
      name: "Pliers, Cutters & Strippers",
      slug: "pliers-cutters-strippers",
      description: "General pliers, circlip pliers, wire strippers, crimpers and cutters.",
      image: "/products/hand-tools/image17.png",
      matchTerms: ["plier", "stripper", "crimping", "cable & bolt cutter", "nipper", "pincer", "xl-plier"],
    },
    {
      name: "Sockets & Keys",
      slug: "sockets-keys",
      description: "Socket sets, impact sockets and Allen key sets.",
      image: "/products/hand-tools/image32.png",
      matchTerms: ["socket", "allen key", "xl-socket"],
    },
    {
      name: "Screwdrivers",
      slug: "screwdrivers",
      description: "Flat, Phillips, Torx, insulated, precision and screwdriver sets.",
      image: "/products/hand-tools/image13.png",
      matchTerms: ["screwdriver", "line tester", "xl-screw"],
    },
    {
      name: "Clamps & Vices",
      slug: "clamps-vices",
      description: "G, C and F clamps plus bench and pipe vices.",
      image: "/products/hand-tools/image27.png",
      matchTerms: ["clamp", "vice", "xl-clamp"],
    },
    {
      name: "Cutting, Sawing & Drilling",
      slug: "cutting-sawing-drilling",
      description: "Hacksaws, chisels, punches, tile cutters and drill accessories.",
      image: "/products/hand-tools/image52.png",
      matchTerms: ["hacksaw", "chisel", "punch", "tile cutter", "cutting & drill", "pvc pipe", "snap-off", "steel files", "hole saw", "abrasive wheels", "xl-cut"],
    },
    {
      name: "Riveting & Pulling Tools",
      slug: "riveting-pulling-tools",
      description: "Hand riveters, rivet nut tools and bearing pullers.",
      image: "/products/hand-tools/image22.png",
      matchTerms: ["riveter", "bearing puller", "xl-rivet"],
    },
    {
      name: "Measuring Tools",
      slug: "measuring-tools",
      description: "Vernier calipers, measuring tapes, spirit levels, squares and rules.",
      image: "/products/hand-tools/image12.png",
      matchTerms: ["vernier", "measuring", "try square", "steel rule", "calipers", "spring dividers", "xl-measure"],
    },
    {
      name: "Lubrication & Spray Tools",
      slug: "lubrication-spray-tools",
      description: "Grease guns, oil cans, paint spray guns and air guns.",
      image: "/products/hand-tools/image25.png",
      matchTerms: ["grease gun", "oil can", "spray", "air gun", "xl-spray"],
    },
    {
      name: "Automotive & Lifting Tools",
      slug: "automotive-lifting-tools",
      description: "Hydraulic jacks, jack stands and workshop lifting tools.",
      image: "/products/hand-tools/image50.png",
      matchTerms: ["hydraulic jack", "jack stand", "xl-lift"],
    },
    {
      name: "Masonry & Finishing Tools",
      slug: "masonry-finishing-tools",
      description: "Masonry trowels, putty knives and scrapers.",
      image: "/products/hand-tools/image45.png",
      matchTerms: ["masonry", "putty", "scraper", "xl-mason"],
    },
    {
      name: "Garden Tools",
      slug: "garden-tools",
      description: "Pruning, shearing, cultivating and general garden hand tools.",
      image: "/products/hand-tools/image43.png",
      matchTerms: ["garden", "hedge", "bill hook", "pruning", "angle shear", "xl-garden"],
    },
    {
      name: "Tool Storage & Workshop Accessories",
      slug: "tool-storage-workshop-accessories",
      description: "Tool boxes, kits, scissors, snips, dispensers and staplers.",
      image: "/products/hand-tools/image31.png",
      matchTerms: ["tool box", "tool kit", "tool bag", "tools trolley", "scissors", "snips", "tape dispenser", "stapler", "magnetic", "carpenter tools", "spoke shave", "block plane", "non-sparking", "xl-storage"],
    },
  ],
  "industrial-adhesives-sealants": [
    {
      name: "Loctite",
      slug: "loctite",
      description: "Threadlockers, instant adhesives, retaining compounds, and sealants.",
      image: "/products/locite.jpg",
      matchTerms: ["loctite", "loc-"],
    },
    {
      name: "Fevicol",
      slug: "fevicol",
      description: "Rubber, foam, flooring, and footwear adhesives for professional applications.",
      image: "/products/fevicol.png",
      matchTerms: ["fevicol", "fevikwik", "flex kwik", "fev-", "fkw", "flx-"],
    },
    {
      name: "Araldite",
      slug: "araldite",
      description: "Two-part epoxy adhesives, structural bonding systems, and construction adhesives.",
      image: "/products/araldite-standard.png",
      matchTerms: ["araldite", "ara-"],
    },
    {
      name: "Anabond",
      slug: "anabond",
      description: "Gasket makers, threadlockers, retaining compounds, silicones, and instant adhesives.",
      matchTerms: ["anabond", "ana-"],
    },
    {
      name: "M-Seal",
      slug: "m-seal",
      description: "Epoxy repair compounds and PVC, UPVC, and CPVC solvent cements.",
      matchTerms: ["m-seal", "mseal", "mse-"],
    },
    {
      name: "Dowsil",
      slug: "dowsil",
      description: "Professional silicone sealants for glazing, construction, and sanitary applications.",
      image: "/products/dowsil.png",
      matchTerms: ["dowsil", "dow-"],
    },
    {
      name: "Other Adhesive Brands",
      slug: "other-adhesive-brands",
      description: "Specialist adhesives, sealants, PU foam, PVC solvent cement, and repair products.",
      image: "/products/abro.png",
      matchTerms: ["abro", "dendrite", "dklog", "holdite", "abr-", "den-", "dkl-", "hol-"],
    },
  ],
};

export function getCategoryBrands(categorySlug: string) {
  return categoryBrandGroups[categorySlug.trim()] ?? [];
}

export function getCategoryBrand(categorySlug: string, brandSlug: string) {
  return getCategoryBrands(categorySlug).find((brand) => brand.slug === brandSlug.trim());
}

export function productMatchesBrand(
  product: { name?: string | null; code?: string | null; brand?: string | null },
  brand: CategoryBrand
) {
  const searchable = `${product.brand ?? ""} ${product.name ?? ""} ${product.code ?? ""}`.toLowerCase();
  return brand.matchTerms.some((term) => searchable.includes(term.toLowerCase()));
}
