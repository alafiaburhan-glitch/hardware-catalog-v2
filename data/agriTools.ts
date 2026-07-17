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
  const codes = items.map((item) => item.code);
  const weights = [...new Set(items.map((item) => item.weightKg).filter(Boolean))]
    .sort((firstWeight, secondWeight) => Number(firstWeight) - Number(secondWeight));
  return {
    id: `agri-tool-${group.key}`,
    name: group.name,
    slug: `tata-agrico-${group.key}`,
    code: codes.length === 1 ? codes[0] : `${first.prefix} Series`,
    category: "agri-tools",
    image: `/products/agri-tools/${first.prefix.toLowerCase()}.webp`,
    brand: "Tata Agrico",
    description: `${group.name} with ${items.length} catalog ${items.length === 1 ? "model" : "models"} for agricultural, farming and professional field use. Select an item code below for its exact weight and pack specification.`,
    specifications: {
      Brand: "Tata Agrico",
      "Instrument Group": group.family,
      "Product Family": group.name.replace("Tata Agrico ", ""),
      "Available Models": `${items.length} catalog ${items.length === 1 ? "entry" : "entries"}`,
      ...(weights.length ? { "Available Weights": weights.map((weight) => `${weight} kg`).join(", ") } : {}),
      HSN: [...new Set(items.map((item) => item.hsn))].join(", "),
      Application: "Agricultural, farming and professional field use",
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
      },
    })),
  };
});

export function getAgriTool(slug: string) {
  return agriTools.find((product) => product.slug === slug);
}
