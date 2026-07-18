import generatedData from "./tataAgriTools.generated.json";
import type { PowerToolModel } from "./powerTools";

type GeneratedAgriTool = {
  code: string;
  description: string;
  family: string;
  prefix: string;
  hsn: string;
  weightKg: string;
  packQty: string;
  catalogPage: number;
};

export type AgriTool = {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: "agri-tools";
  description: string;
  image: string;
  brand: string;
  specifications: Record<string, string>;
  models: PowerToolModel[];
};

type ProductGroup = {
  key: string;
  name: string;
  family: string;
};

type FamilyProfile = {
  image?: string;
  overview: string;
  application: string;
  construction: string;
  selection: string;
};

const familyProfiles: Record<string, FamilyProfile> = {
  Axe: {
    image: "/products/agri-tools/axe-studio.png",
    overview: "Forged axe heads sized for cutting, clearing and general farm maintenance.",
    application: "Cutting branches, splitting light timber and field clearing",
    construction: "Forged steel cutting head; handle fitment depends on the selected code",
    selection: "Choose by head weight and confirm whether a fitted handle is required",
  },
  Chisel: {
    image: "/products/agri-tools/chisel-studio.png",
    overview: "Heavy-duty forged chisels for agricultural repair, masonry and workshop use.",
    application: "Chipping, cutting and dressing metal or masonry",
    construction: "One-piece forged steel body with a sharpened working edge",
    selection: "Match the listed diameter, length and material weight to the job",
  },
  Crowbar: {
    image: "/products/agri-tools/crowbar-studio.png",
    overview: "Forged crowbars in straight, bent and scoop profiles for digging and leverage work.",
    application: "Digging hard ground, loosening stones, aligning and general levering",
    construction: "One-piece forged steel bar with profile determined by model",
    selection: "Choose the working-end profile, bar size and weight for the task",
  },
  Hammer: {
    image: "/products/agri-tools/hammer-studio.png",
    overview: "Forged striking tools covering double-face, straight-pein and regional hammer patterns.",
    application: "Heavy striking, fitting, repair and maintenance work",
    construction: "Forged steel head; round- or oval-eye pattern varies by series",
    selection: "Select head pattern, eye type and weight; verify handle supply separately",
  },
  "Hoe / Powrah": {
    image: "/products/agri-tools/hoe-powrah-studio.png",
    overview: "Regional hoes, powrahs and mammoties for soil preparation and field maintenance.",
    application: "Breaking soil, earthing, trenching, weeding and moving loose material",
    construction: "Forged working head with tanged, riveted, integrated or separate-handle options",
    selection: "Match the regional pattern and attachment style to local working practice",
  },
  "Pickaxe / Kudali": {
    image: "/products/agri-tools/pickaxe-kudali-studio.png",
    overview: "Pickaxes, kudalis and mattocks for demanding excavation and ground-breaking work.",
    application: "Breaking compacted soil, trenching, grubbing roots and loosening rock",
    construction: "Forged steel head in double-point, chisel-point or mattock profile",
    selection: "Choose the head profile and weight, then confirm handled or head-only supply",
  },
  Sickle: {
    image: "/products/agri-tools/sickle-studio.png",
    overview: "Curved harvesting sickles with plain or toothed cutting profiles and multiple handle options.",
    application: "Harvesting fodder and crops, cutting grass and light vegetation",
    construction: "Curved steel blade with wooden or polymer handle according to model",
    selection: "Choose blade pattern, tooth orientation and handle material",
  },
  Shovel: {
    image: "/products/agri-tools/shovel-studio.png",
    overview: "Round- and square-nose shovels in standard, lightweight and integrated constructions.",
    application: "Digging, loading and transferring soil, sand, grain and loose material",
    construction: "Pressed or forged steel blade with separate, steel or integrated handle options",
    selection: "Use round nose for digging and square nose for scooping or levelling",
  },
  "Rotavator Blade": {
    overview: "Replacement tiller blades supplied in model-specific profiles for rotary soil preparation.",
    application: "Rotavator and rotary tiller soil-cutting assemblies",
    construction: "Formed, heat-treated steel blade with machine mounting provision",
    selection: "Confirm profile, orientation, mounting pattern and machine compatibility before ordering",
  },
  "Chaff Cutter": {
    overview: "Replacement cutting components for compatible chaff-cutter and thresher assemblies.",
    application: "Cutting fodder and crop residue in compatible agricultural machines",
    construction: "Hardened steel cutter component supplied as an implement spare",
    selection: "Match item code, cutter type, dimensions and machine compatibility",
  },
  "Tiller Shoe / Cultivator": {
    overview: "Cultivator points and tiller shoes for soil opening, shallow tillage and wear-part replacement.",
    application: "Cultivator and tiller ground-engaging assemblies",
    construction: "Forged or formed wear-resistant steel implement component",
    selection: "Confirm profile, size, mounting arrangement and implement compatibility",
  },
};

const generated = generatedData as GeneratedAgriTool[];

const descriptionCorrections: Record<string, string> = {
  HOE006: "Powrah - East India",
  HOE009: "Powrah - Bombay 7",
  HOE058: "Powrah - East India Smaller",
  HOE074: "Powrah - Integrated AG 4",
  SICM09: "Sickle - 107 (Top Teeth): Wooden Handle",
  SICM27: "Sickle - 107 (Top Teeth): Plastic Handle",
  SICM28: "Sickle - 108 (Top Teeth): Plastic Handle",
  SVL026: "Shovel - RD 2 Steel Handle - Lightweight",
  SVL032: "Shovel - Integrated RD 4",
  TLS015: "Cultivator - 14 CS3 (2.15 kg)",
};

function description(item: GeneratedAgriTool) {
  return descriptionCorrections[item.code] ?? item.description;
}

function groupFor(item: GeneratedAgriTool): ProductGroup {
  const value = description(item).toLowerCase();

  if (item.prefix === "AXE") return { key: "axe", name: "Tata Agrico Axe", family: "Axe" };
  if (item.prefix === "CHE") return { key: "chisel", name: "Tata Agrico Chisel", family: "Chisel" };
  if (item.prefix === "CWB") return { key: "crowbar", name: "Tata Agrico Crowbar", family: "Crowbar" };
  if (item.prefix === "CFC") return { key: "chaff-cutter", name: "Tata Agrico Chaff & Thresher Cutter", family: "Chaff Cutter" };
  if (item.prefix === "RVB") return { key: "rotavator-blade", name: "Tata Agrico Rotavator Blade", family: "Rotavator Blade" };
  if (item.prefix === "TLS") return { key: "cultivator-tiller-shoe", name: "Tata Agrico Cultivator & Tiller Shoe", family: "Tiller Shoe / Cultivator" };
  if (item.prefix === "SIC" || item.prefix === "SICM") return { key: "sickle", name: "Tata Agrico Sickle", family: "Sickle" };

  if (item.prefix === "HMR") {
    if (value.includes("rajasthan")) return { key: "hammer-rajasthan", name: "Tata Agrico Rajasthan Hammer", family: "Hammer" };
    if (value.includes("oval hole")) return { key: "hammer-straight-pein-oval", name: "Tata Agrico Straight Pein Hammer - Oval Hole", family: "Hammer" };
    if (value.includes("sp-") || value.includes("sp ")) return { key: "hammer-straight-pein-round", name: "Tata Agrico Straight Pein Hammer - Round Hole", family: "Hammer" };
    return { key: "hammer-double-face-sledge", name: "Tata Agrico Double Face Sledge Hammer", family: "Hammer" };
  }

  if (item.prefix === "PKX") {
    if (value.includes("handle")) return { key: "pickaxe-handle", name: "Tata Agrico Pickaxe & Kudali Handle", family: "Pickaxe / Kudali" };
    if (value.includes("mattock")) return { key: "pick-mattock", name: "Tata Agrico Pick Mattock", family: "Pickaxe / Kudali" };
    if (value.includes(" dp")) return { key: "pickaxe-double-point", name: "Tata Agrico Double Point Kudali", family: "Pickaxe / Kudali" };
    return { key: "pickaxe-chisel-point", name: "Tata Agrico Chisel Point Pickaxe & Kudali", family: "Pickaxe / Kudali" };
  }

  if (item.prefix === "SVL") {
    if (value.includes("handle assembly") || value.includes("without handle")) return { key: "shovel-handle", name: "Tata Agrico Shovel Handle & Head", family: "Shovel" };
    if (value.includes("integrated")) return { key: "shovel-integrated", name: "Tata Agrico Integrated Shovel", family: "Shovel" };
    if (value.includes("light")) return { key: "shovel-lightweight", name: "Tata Agrico Lightweight Shovel", family: "Shovel" };
    if (value.includes("rd ")) return { key: "shovel-round-nose", name: "Tata Agrico Round Nose Shovel", family: "Shovel" };
    return { key: "shovel-square-nose", name: "Tata Agrico Square Nose Shovel", family: "Shovel" };
  }

  if (item.prefix === "HOE") {
    if (value.includes("handle")) return { key: "powrah-handle", name: "Tata Agrico Powrah Handle", family: "Hoe / Powrah" };
    if (value.includes("integrated")) return { key: "powrah-integrated", name: "Tata Agrico Integrated Powrah", family: "Hoe / Powrah" };
    if (value.includes("potato")) return { key: "powrah-potato", name: "Tata Agrico Potato Hoe", family: "Hoe / Powrah" };
    if (value.includes("tp ") || value.includes("riveted") || value.includes("panja")) return { key: "powrah-tp", name: "Tata Agrico TP Series Riveted Powrah", family: "Hoe / Powrah" };
    if (value.includes("snm")) return { key: "powrah-swan-neck", name: "Tata Agrico Swan Neck Mammoty", family: "Hoe / Powrah" };
    if (value.includes("tm ") || value.includes("kundali")) return { key: "powrah-tanged", name: "Tata Agrico Tanged Mammoty", family: "Hoe / Powrah" };
    if (value.includes("mm ") || value.includes("button head") || value.includes("bhm")) return { key: "powrah-mysore", name: "Tata Agrico Mysore Mammoty", family: "Hoe / Powrah" };
    if (value.includes("fork")) return { key: "powrah-fork", name: "Tata Agrico Powrah Fork", family: "Hoe / Powrah" };
    if (/\bag\s*[3456]\b/.test(value)) return { key: "powrah-ag", name: "Tata Agrico AG Series Powrah", family: "Hoe / Powrah" };
    return { key: "powrah-regional", name: "Tata Agrico Regional Powrah & Hoe", family: "Hoe / Powrah" };
  }

  throw new Error(`Unmapped Tata Agrico product: ${item.code}`);
}

const grouped = new Map<string, { group: ProductGroup; items: GeneratedAgriTool[] }>();
for (const item of generated) {
  const group = groupFor(item);
  const existing = grouped.get(group.key);
  if (existing) existing.items.push(item);
  else grouped.set(group.key, { group, items: [item] });
}

export const agriTools: AgriTool[] = [...grouped.values()].map(({ group, items }) => {
  const first = items[0];
  const profile = familyProfiles[group.family];
  const codes = items.map((item) => item.code);
  const weights = [...new Set(items.map((item) => item.weightKg).filter(Boolean))]
    .sort((firstWeight, secondWeight) => Number(firstWeight) - Number(secondWeight));
  return {
    id: `agri-tool-${group.key}`,
    name: group.name,
    slug: `tata-agrico-${group.key}`,
    code: codes.length === 1 ? codes[0] : `${first.prefix} Series`,
    category: "agri-tools",
    image: profile.image ?? `/products/agri-tools/${first.prefix.toLowerCase()}.webp`,
    brand: "Tata Agrico",
    description: `${profile.overview} This ${group.name.replace("Tata Agrico ", "")} range includes ${items.length} catalog ${items.length === 1 ? "model" : "models"}; select an item code for the exact weight, packing quantity and catalog reference.`,
    specifications: {
      Brand: "Tata Agrico",
      "Instrument Group": group.family,
      "Product Family": group.name.replace("Tata Agrico ", ""),
      "Available Models": `${items.length} catalog ${items.length === 1 ? "entry" : "entries"}`,
      ...(weights.length ? { "Available Weights": weights.map((weight) => `${weight} kg`).join(", ") } : {}),
      HSN: [...new Set(items.map((item) => item.hsn))].join(", "),
      Application: profile.application,
      Construction: profile.construction,
      "Selection Guide": profile.selection,
      "Supply Format": "Model-dependent; review the selected item description for head, blade, handle or assembly details",
    },
    models: items.map((item) => ({
      brand: "Tata Agrico",
      name: `${item.code} - ${description(item)}`,
      series: group.name.replace("Tata Agrico ", ""),
      specifications: {
        "Item Code": item.code,
        ...(item.weightKg ? { "Material Weight": `${item.weightKg} kg` } : {}),
        ...(item.packQty ? { "Pack Quantity / MOQ": `${item.packQty} pieces` } : {}),
        HSN: item.hsn,
        "Catalog Reference": `Tata Agrico catalog page ${item.catalogPage}`,
      },
    })),
  };
});

export function getAgriTool(slug: string) {
  return agriTools.find((product) => product.slug === slug);
}
