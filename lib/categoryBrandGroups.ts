export type CategoryBrand = {
  name: string;
  slug: string;
  description: string;
  image?: string;
  matchTerms: string[];
};

export const categoryBrandGroups: Record<string, CategoryBrand[]> = {
  "agri-tools": [
    { name: "Axes", slug: "axes", description: "Forged agricultural axes in catalog head weights for cutting and field clearing.", image: "/products/agri-tools/axe-studio.png", matchTerms: ["Axe"] },
    { name: "Chisels", slug: "chisels", description: "Forged chisels in catalog diameters, lengths and material weights.", image: "/products/agri-tools/chisel-studio.png", matchTerms: ["Chisel"] },
    { name: "Crowbars", slug: "crowbars", description: "Straight, bent and scoop crowbars for digging and leverage work.", image: "/products/agri-tools/crowbar-studio.png", matchTerms: ["Crowbar"] },
    { name: "Hammers", slug: "hammers", description: "Double-face, straight-pein and regional forged hammer patterns.", image: "/products/agri-tools/hammer-studio.png", matchTerms: ["Hammer"] },
    { name: "Hoes & Powrahs", slug: "hoes-powrahs", description: "Regional, tanged, riveted, integrated and handled soil-working tools.", image: "/products/agri-tools/hoe-powrah-studio.png", matchTerms: ["Hoe / Powrah"] },
    { name: "Pickaxes & Kudalis", slug: "pickaxes-kudalis", description: "Double-point, chisel-point and mattock profiles for hard-ground work.", image: "/products/agri-tools/pickaxe-kudali-studio.png", matchTerms: ["Pickaxe / Kudali"] },
    { name: "Sickles", slug: "sickles", description: "Plain and toothed harvesting sickles with wooden or polymer handles.", image: "/products/agri-tools/sickle-studio.png", matchTerms: ["Sickle"] },
    { name: "Shovels", slug: "shovels", description: "Round-nose, square-nose, lightweight and integrated shovel constructions.", image: "/products/agri-tools/shovel-studio.png", matchTerms: ["Shovel"] },
    { name: "Rotavator Blades", slug: "rotavator-blades", description: "Tata Agrico rotavator blades in catalog profiles.", image: "/products/agri-tools/rvb.webp", matchTerms: ["Rotavator Blade"] },
    { name: "Chaff Cutters", slug: "chaff-cutters", description: "Chaff and thresher cutter models for farm use.", image: "/products/agri-tools/cfc.webp", matchTerms: ["Chaff Cutter"] },
    { name: "Tiller Shoes & Cultivators", slug: "tiller-shoes-cultivators", description: "Cultivator and tiller-shoe models in catalog sizes.", image: "/products/agri-tools/tls.webp", matchTerms: ["Tiller Shoe / Cultivator"] },
  ],
  "measuring-instruments": [
    { name: "Calipers, Height & Depth Gauges", slug: "calipers-height-depth", description: "Vernier, digital, dial and specialist calipers plus height and depth gauges.", image: "/products/measuring-instruments/animated/calipers.png", matchTerms: ["Calipers, Height & Depth Gauges"] },
    { name: "Micrometers", slug: "micrometers", description: "Outside, inside, depth, blade, tube, point, thread and digital micrometers.", image: "/products/measuring-instruments/animated/micrometers.png", matchTerms: ["Micrometers"] },
    { name: "Indicators & Gauges", slug: "indicators-gauges", description: "Dial indicators, bore gauges, thickness gauges, snap gauges and inspection gauges.", image: "/products/measuring-instruments/animated/indicators-gauges.png", matchTerms: ["Indicators & Gauges"] },
    { name: "Tapes & Measuring Wheels", slug: "tapes-measuring-wheels", description: "Steel, fibreglass and metal-wired tapes, tape rules, refills and measuring wheels.", image: "/products/measuring-instruments/animated/tapes-wheels.png", matchTerms: ["Tapes & Measuring Wheels"] },
    { name: "Levels, Squares & Angle Measurement", slug: "levels-squares-angle", description: "Spirit and digital levels, squares, protractors, angle finders and straight edges.", image: "/products/measuring-instruments/animated/levels-angle.png", matchTerms: ["Levels, Squares & Angle Measurement"] },
    { name: "NDT & Material Testing", slug: "ndt-material-testing", description: "Hardness, coating, ultrasonic thickness and surface roughness testing instruments.", image: "/products/measuring-instruments/animated/ndt-material-testing.png", matchTerms: ["NDT & Material Testing"] },
    { name: "Environmental & Electronic Testers", slug: "environmental-electronic-testers", description: "Sound, vibration, temperature, air velocity, light and moisture instruments.", image: "/products/measuring-instruments/animated/electronic-testers.png", matchTerms: ["Environmental & Electronic Testers"] },
    { name: "Rules, Blocks & Reference Gauges", slug: "rules-blocks-reference", description: "Steel rules, gauge blocks, radius gauges and workshop reference tools.", image: "/products/measuring-instruments/animated/rules-blocks.png", matchTerms: ["Rules, Blocks & Reference Gauges"] },
    { name: "Stands & Holders", slug: "stands-holders", description: "Magnetic stands, indicator holders and micrometer stands.", image: "/products/measuring-instruments/animated/stands-holders.png", matchTerms: ["Stands & Holders"] },
  ],
  "hand-tools": [
    {
      name: "Spanners",
      slug: "spanners-wrenches",
      description: "Adjustable, open jaw, ring, combination, T, pipe and torque spanners.",
      image: "/products/hand-tools/animated/adjustable-wrench.png",
      matchTerms: ["wrench", "spanner", "ht-spanner"],
    },
    {
      name: "Hammers",
      slug: "hammers-mallets",
      description: "Nylon, rubber, sledge, ball pein, claw and soft-faced hammers.",
      image: "/products/hand-tools/animated/ball-pein-and-claw-hammer.png",
      matchTerms: ["hammer", "mallet", "ht-hammer"],
    },
    {
      name: "Pliers, Cutters & Strippers",
      slug: "pliers-cutters-strippers",
      description: "General pliers, circlip pliers, wire strippers, crimpers and cutters.",
      image: "/products/hand-tools/animated/pliers.png",
      matchTerms: ["plier", "stripper", "crimping", "cable & bolt cutter", "nipper", "pincer", "ht-plier"],
    },
    {
      name: "Sockets & Keys",
      slug: "sockets-keys",
      description: "Socket sets, impact sockets and Allen key sets.",
      image: "/products/hand-tools/animated/socket-set.png",
      matchTerms: ["socket", "allen key", "ht-socket"],
    },
    {
      name: "Screwdrivers",
      slug: "screwdrivers",
      description: "Flat, Phillips, Torx, insulated, precision and screwdriver sets.",
      image: "/products/hand-tools/animated/screwdriver-set.png",
      matchTerms: ["screwdriver", "line tester", "ht-screw"],
    },
    {
      name: "Clamps & Vices",
      slug: "clamps-vices",
      description: "G, C and F clamps plus bench and pipe vices.",
      image: "/products/hand-tools/animated/g-c-and-f-clamp.png",
      matchTerms: ["clamp", "vice", "ht-clamp"],
    },
    {
      name: "Cutting, Sawing & Drilling",
      slug: "cutting-sawing-drilling",
      description: "Hacksaws, chisels, punches, tile cutters and drill accessories.",
      image: "/products/hand-tools/animated/hacksaw-frame-and-blade.png",
      matchTerms: ["hacksaw", "chisel", "punch", "tile cutter", "cutting & drill", "pvc pipe", "snap-off", "steel files", "hole saw", "abrasive wheels", "ht-cut"],
    },
    {
      name: "Riveting & Pulling Tools",
      slug: "riveting-pulling-tools",
      description: "Hand riveters, rivet nut tools and bearing pullers.",
      image: "/products/hand-tools/animated/hand-riveter-and-rivet-nut-tool.png",
      matchTerms: ["riveter", "bearing puller", "ht-rivet"],
    },
    {
      name: "Measuring Tools",
      slug: "measuring-tools",
      description: "Vernier calipers, measuring tapes, spirit levels, squares and rules.",
      image: "/products/hand-tools/animated/measuring-tape-and-spirit-level.png",
      matchTerms: ["vernier", "measuring", "try square", "steel rule", "calipers", "spring dividers", "ht-measure"],
    },
    {
      name: "Lubrication & Spray Tools",
      slug: "lubrication-spray-tools",
      description: "Grease guns, oil cans, paint spray guns and air guns.",
      image: "/products/hand-tools/animated/grease-gun-and-oil-can.png",
      matchTerms: ["grease gun", "oil can", "spray", "air gun", "ht-spray"],
    },
    {
      name: "Automotive & Lifting Tools",
      slug: "automotive-lifting-tools",
      description: "Hydraulic jacks, jack stands and workshop lifting tools.",
      image: "/products/hand-tools/animated/hydraulic-jack-and-jack-stand.png",
      matchTerms: ["hydraulic jack", "jack stand", "ht-lift"],
    },
    {
      name: "Masonry & Finishing Tools",
      slug: "masonry-finishing-tools",
      description: "Masonry trowels, putty knives and scrapers.",
      image: "/products/hand-tools/animated/masonry-trowel.png",
      matchTerms: ["masonry", "putty", "scraper", "ht-mason"],
    },
    {
      name: "Garden Tools",
      slug: "garden-tools",
      description: "Pruning, shearing, cultivating and general garden hand tools.",
      image: "/products/hand-tools/animated/garden-tool-set.png",
      matchTerms: ["garden", "hedge", "bill hook", "pruning", "angle shear", "ht-garden"],
    },
    {
      name: "Tool Storage & Workshop Accessories",
      slug: "tool-storage-workshop-accessories",
      description: "Tool boxes, kits, scissors, snips, dispensers and staplers.",
      image: "/products/hand-tools/animated/tool-box-and-tool-kit.png",
      matchTerms: ["tool box", "tool kit", "tool bag", "tools trolley", "scissors", "snips", "tape dispenser", "stapler", "magnetic", "carpenter tools", "spoke shave", "block plane", "non-sparking", "ht-storage"],
    },
    {
      name: "Other Hand Tools",
      slug: "other-hand-tools",
      description: "Additional specialist products in our hand-tools range.",
      image: "/products/hand-tools/animated/non-sparking-tools.png",
      matchTerms: ["ht-other"],
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
  product: { name?: string | null; code?: string | null; brand?: string | null; instrumentGroup?: string | null; specifications?: Record<string, unknown> | null },
  brand: CategoryBrand
) {
  const group = product.instrumentGroup ?? product.specifications?.["Instrument Group"] ?? "";
  const searchable = `${product.brand ?? ""} ${product.name ?? ""} ${product.code ?? ""} ${String(group)}`.toLowerCase();
  return brand.matchTerms.some((term) => searchable.includes(term.toLowerCase()));
}
