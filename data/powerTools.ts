import powerToolsData from "@/data/powerTools.generated.json";
import { powerToolDescriptions } from "@/data/powerToolDescriptions";

export type PowerToolModel = {
  brand: string;
  name: string;
  series?: string;
  image?: string;
  specifications: Record<string, string>;
};

export type CatalogPowerTool = {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: "power-tools";
  section: "power-tools" | "power-tools-accessories" | "power-tools-spare-parts";
  description: string;
  image: string;
  brand: string;
  specifications: Record<string, string>;
  models: PowerToolModel[];
};

export const powerTools = (powerToolsData as CatalogPowerTool[]).map((product) => ({
  ...product,
  description: powerToolDescriptions[product.slug] ?? product.description,
}));

function canonicalFamilySlug(slug: string) {
  const singulars: Record<string, string> = {
    grinders: "grinder", drills: "drill", machines: "machine", hammers: "hammer",
    cutters: "cutter", saws: "saw", blowers: "blower", washers: "washer",
    cleaners: "cleaner", sprayers: "sprayer", wheels: "wheel", discs: "disc",
    blades: "blade", chisels: "chisel", bits: "bit", pads: "pad", hoses: "hose",
    spares: "spare", guns: "gun", batteries: "battery", wrenches: "wrench",
    compressors: "compressor", accessories: "accessory",
  };
  return slug.split("-").map((part) => singulars[part] ?? part).join("-");
}

export function getPowerTool(slug: string) {
  const canonical = canonicalFamilySlug(slug);
  return powerTools.find((product) => product.slug === slug || product.slug === canonical);
}

export function getPowerToolsSection(section: CatalogPowerTool["section"]) {
  return powerTools.filter((product) => product.section === section);
}
