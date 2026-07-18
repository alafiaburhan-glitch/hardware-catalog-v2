export type CatalogMeasuringInstrument = {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: "measuring-instruments";
  description: string;
  image: string;
  brand: string;
  instrumentGroup: string;
  specifications: Record<string, string>;
};

type SourceItem = { name: string };

const yamayoNames = [
  "Vernier Calipers Without Fine Adjustment", "Vernier Calipers With Fine Adjustment",
  "Heavy Duty Vernier Calipers", "Heavy Duty Solid Type Vernier Calipers", "Long Jaw Vernier Calipers",
  "Vernier Calipers With Carbide Jaws", "Dial Calipers", "Absolute Digimatic Calipers",
  "Digimatic Calipers", "Heavy Duty Digimatic Calipers", "Waterproof Digimatic Calipers",
  "Digimatic Calipers With Carbide Jaws", "Digimatic Carbon Fiber Calipers", "Digimatic Smart Calipers",
  "Digimatic Gear Tooth Calipers", "Digimatic Inside Point Type Calipers",
  "Digimatic Inside Flat Point Type Calipers", "Digimatic Inside Knife Edge Point Type Calipers",
  "Digimatic Tube Calipers", "RTJ Groove Calipers", "Digimatic Inside Groove Calipers",
  "Vernier Depth Calipers", "Digimatic Depth Calipers", "Digimatic Double Hook Depth Calipers",
  "Vernier Height Gauges", "Digimatic Single Beam Height Gauges With Hand Wheel",
  "Digimatic Double Beam Height Gauges With Geared Roller", "Digit Dial Height Gauges",
  "Digimatic Single Beam Height Gauges", "Outside Micrometers - Metric", "Outside Micrometers - Inch",
  "Digimatic Outside Micrometers", "Digit Counter Type Micrometers", "Interchangeable Outside Micrometers",
  "Adjustable Outside Micrometers", "Digimatic Interchangeable Outside Micrometers", "Disc Micrometers",
  "Screw Thread Micrometers", "Blade Outside Micrometers", "Digimatic Blade Outside Micrometers",
  "Tube Outside Micrometers", "Point Outside Micrometers", "Digimatic Point Outside Micrometers",
  "Crimp Height Micrometers", "Micrometer Heads", "Micrometer Stands", "Depth Micrometers",
  "Digimatic Depth Micrometers", "Groove Micrometers", "Tubular Inside Micrometers",
  "Jaw Type Inside Micrometers", "Inside Rod Type Micrometers", "Three Point Internal Micrometers (Hole Test)",
  "Dial Indicators (Plunger Type)", "Digimatic Indicators (Plunger Type)", "Dial Test Indicators",
  "Vertical Dial Test Indicators", "Digimatic Test Indicators", "Lever Dial Holders", "Magnetic Stands",
  "Dial Bore Gauges", "Inside Dial Caliper Gauges", "Inside Pistol Dial Caliper Gauges",
  "Internal Dial Caliper Gauges With Interchangeable Anvils", "Small Hole Gauges", "Telescoping Gauges",
  "P Type Dial and Digimatic Caliper Gauges", "Dial Thickness Gauges", "Digimatic Thickness Gauges",
  "Outside Pistol Dial Caliper Gauges", "Quick Mini Thickness Gauges", "Digimatic Snap Thickness Gauges",
  "Digimatic Mini Snap Gauges", "Digimatic Multi-Purpose Snap Gauges", "Combination Square Sets",
  "Bevel Protractors", "Digimatic Bevel Protractors", "Digimatic Protractors", "Digital Angle Finders",
  "Linear Block Levels", "Dual Axis Digital Angle Protractors", "Digital Levels", "Angle Gauges",
  "Straight Edges", "Beveled Edge Squares", "Gauge Block Sets", "Durometers (Shore Hardness Testers)",
  "Digital Durometers", "Radius Gauges", "Digimatic Pye Tapes", "Steel Rulers", "Laser Distance Meters",
  "Oil Dip Tapes", "Oil Tape Refills", "Measuring Wheels", "Digital Measuring Wheels",
  "Digimatic Gap and Step Gauges", "Digimatic Welding Seam Gauges", "Sound Level Meters",
  "Digital Tachometers", "Vibration Meters", "Infrared Thermometers", "Anemometers", "Lux Meters",
  "Moisture Meters", "Portable Hardness Testers", "Leeb Hardness Testers", "Coating Thickness Gauges",
  "Ultrasonic Thickness Gauges", "Surface Roughness Testers", "Industrial Endoscopes and Fiberscopes",
].map((name) => ({ name }));

const kencyNames = [
  "Vernier Caliper With Fine Adjustment", "Nib Style Jaw Vernier Caliper With Fine Adjustment",
  "Digital Caliper - Eco Model", "Digital Caliper - Absolute ABS Model",
  "Nib Style Jaw Digital Caliper - Absolute ABS Model", "Digital Caliper - Metal Body", "Dial Caliper",
  "Vernier Depth Gauge", "Digital Depth Gauge", "Double Hook Digital Depth Gauge", "Digital Tire Depth Gauge",
  "Inside Groove Digital Caliper - Flat Measuring Points", "Inside Groove Digital Caliper - Round Measuring Points",
  "Double Inside Groove Digital Caliper - Round Measuring Points", "Textile Vernier Caliper - Flat Measuring Points",
  "Gear Tooth Digital Caliper", "Outside Groove Digital Caliper - Flat Measuring Points",
  "Inside Dial Snap Gauge", "Outside Micrometer", "Outside Digital Micrometer With Data Output",
  "Interchangeable Outside Micrometer With Cast Frame", "Interchangeable Outside Micrometer With Tube Frame",
  "Inside Micrometer - Caliper Type", "Depth Micrometer", "Screw Thread Micrometer",
  "Tubular Inside Micrometer", "Disc Micrometer", "Blade Micrometer", "Tube Micrometer", "Point Micrometer",
  "Digital Thickness Gauge", "Dial Thickness Gauge", "Dial Indicator", "Dial Test Indicator", "Digital Indicator",
  "Bore Dial Gauge", "Vernier Height Gauge With Scriber and Holder", "Digital Height Gauge With Hand Wheel",
  "Digital Protractor", "Digital Bevel Box", "Combination Square", "Gauge Block Set",
  "Coating Thickness Gauge", "Digital Ultrasonic Thickness Gauge", "Shore Hardness Tester",
  "Leeb Hardness Tester", "Surface Roughness Tester", "Video Borescope 6mm", "Universal Magnetic Stand",
  "Magnetic Stand",
].map((name) => ({ name }));

const freemansNames = [
  "Tuff Steel Tape Rule", "FT Trans Steel Tape Rule", "Gripp Steel Tape Rule", "Zest Steel Tape Rule",
  "Zeon Steel Tape Rule", "Ikon Steel Tape Rule", "Max Steel Tape Rule", "Nexa Steel Tape Rule",
  "Easilok Steel Tape Rule", "Star Steel Tape Rule", "Neumezur Steel Tape Rule", "Levo Steel Tape Rule",
  "Zipp Steel Tape Rule", "Starex Steel Tape Rule", "Nano Steel Tape Rule", "Basik Steel Tape Rule",
  "Shox Steel Tape Rule", "Prolok Steel Tape Rule", "Gorilla Steel Tape Rule", "Quickread Steel Tape Rule",
  "Neo Steel Tape Rule", "X-Box Steel Tape Rule", "Centigraff Steel Tape Rule", "Orbit Steel Tape Rule",
  "Goldstar Steel Tape Rule", "Truflex Steel Tape Rule", "Height-O-Meter", "Deb Keychain Tape Rule",
  "Steel Open Reel Tape", "Steel Open Reel Dip Tape", "Steel Leatherette Tape Measure",
  "Steel ABS Case Tape Measure", "Steel Top Line Tape Measure", "Kompakt Steel Tape Measure",
  "Steel Open Reel ABS Case Tape", "Steel Top Gear Tape Measure", "Fibreglass Leatherette Tape Measure",
  "Fibreglass Top Line Tape Measure", "Leatherette Plus Fibreglass Tape Measure", "Fibra Tape Measure",
  "Goldstar Plus Fibreglass Tape Measure", "Grey Magic Fibreglass Tape Measure", "Fibreglass Tape Refills",
  "Top Gear Close Reel Tape", "Tailor Tape", "Top Gear Open Reel Tape", "Fibreglass Open Reel Tape",
  "Viva Open Reel Tape", "Metal Wired Tape Refills", "Metal Wired Leatherette Tape Measure",
  "Metal Wired Top Line Tape Measure", "Plastic Measuring Wheel With Point Marker", "Metal Measuring Wheel",
  "Plastic Measuring Wheel", "Stainless Steel Rules", "Professional Spirit Levels",
  "Box Section Aluminium Levels", "Magnetic Box Section Aluminium Levels", "Digital Measuring Tape",
  "Laser Distance Meter", "Laser Line Level", "Cross Line Laser Level", "Digital Measuring Wheel",
  "Digital Spirit Level", "Vernier Caliper", "Dial Caliper", "Digital Caliper", "Outside Micrometer",
  "Digital Outside Micrometer", "Dial Indicator", "Magnetic Stand", "Mini Digital Level and Protractor",
].map((name) => ({ name }));

const slugify = (value: string) => value.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const FAMILY_ALIASES: Record<string, string> = {
  "outside micrometer metric": "outside micrometer",
  "outside micrometer inch": "outside micrometer",
  "digital outside micrometer with data output": "digital outside micrometer",
  "digital interchangeable outside micrometer": "interchangeable outside micrometer",
  "universal magnetic stand": "magnetic stand",
  "magnetic stand": "magnetic stand",
  "digital protractor": "digital protractor",
  "digital thickness gauge": "digital thickness gauge",
};

const keyFor = (value: string) => {
  const normalized = value.toLowerCase()
    .replace(/digimatic/g, "digital")
    .replace(/calipers/g, "caliper")
    .replace(/micrometers/g, "micrometer")
    .replace(/gauges/g, "gauge")
    .replace(/testers/g, "tester")
    .replace(/meters/g, "meter")
    .replace(/stands/g, "stand")
    .replace(/sets/g, "set")
    .replace(/rulers/g, "ruler")
    .replace(/edges/g, "edge")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  return FAMILY_ALIASES[normalized] ?? normalized;
};

function instrumentGroupFor(name: string) {
  const value = name.toLowerCase();
  if (/(caliper|height gauge|depth gauge)/.test(value)) return "Calipers, Height & Depth Gauges";
  if (/micrometer/.test(value)) return "Micrometers";
  if (/(dial indicator|test indicator|bore gauge|snap gauge|hole gauge|telescoping|caliper gauge|thickness gauge|gap and step|welding seam)/.test(value)) return "Indicators & Gauges";
  if (/(tape|measuring wheel|height-o-meter)/.test(value)) return "Tapes & Measuring Wheels";
  if (/(level|protractor|angle|square|straight edge)/.test(value)) return "Levels, Squares & Angle Measurement";
  if (/(hardness|durometer|coating thickness|ultrasonic thickness|surface roughness|borescope|endoscope|fiberscope)/.test(value)) return "NDT & Material Testing";
  if (/(sound|tachometer|vibration|thermometer|anemometer|lux|moisture)/.test(value)) return "Environmental & Electronic Testers";
  if (/(rule|ruler|gauge block|radius gauge)/.test(value)) return "Rules, Blocks & Reference Gauges";
  if (/(magnetic stand|dial holder|micrometer stand)/.test(value)) return "Stands & Holders";
  return "Other Precision Instruments";
}

const pdfImage = (name: string) => `/products/measuring-instruments/pdf/${name}.webp`;
const animatedImage = (name: string) => `/products/measuring-instruments/animated/${name}.png`;

function imageFor(name: string, brand: string, group: string) {
  const value = name.toLowerCase();
  const freemansSeries: Array<[string, string]> = [
    ["tuff", "freemans-tuff"], ["gripp", "freemans-gripp"], ["zest", "freemans-zest"],
    ["zeon", "freemans-zeon"], ["ikon", "freemans-ikon"], ["max steel", "freemans-max"],
    ["nexa", "freemans-nexa"], ["easilok", "freemans-easilok"],
  ];
  if (brand === "Freemans") {
    const series = freemansSeries.find(([term]) => value.includes(term));
    if (series) return pdfImage(series[1]);
    if (value.includes("measuring wheel")) return pdfImage("freemans-measuring-wheel");
  }

  const imageByGroup: Record<string, string> = {
    "Calipers, Height & Depth Gauges": "calipers",
    Micrometers: "micrometers",
    "Indicators & Gauges": "indicators-gauges",
    "Tapes & Measuring Wheels": "tapes-wheels",
    "Levels, Squares & Angle Measurement": "levels-angle",
    "NDT & Material Testing": "ndt-material-testing",
    "Environmental & Electronic Testers": "electronic-testers",
    "Rules, Blocks & Reference Gauges": "rules-blocks",
    "Stands & Holders": "stands-holders",
    "Other Precision Instruments": "rules-blocks",
  };
  return animatedImage(imageByGroup[group] ?? "rules-blocks");
}

function sizeOptionsFor(name: string): string | undefined {
  const value = name.toLowerCase();
  if (/long jaw|nib style/.test(value)) return "0-600 mm, 0-1000 mm, 0-1500 mm, 0-2000 mm";
  if (/vernier|digital|digimatic|dial/.test(value) && /caliper/.test(value)) return "0-150 mm, 0-200 mm, 0-300 mm";
  if (/depth gauge|depth caliper/.test(value)) return "0-150 mm, 0-200 mm, 0-300 mm";
  if (/height gauge/.test(value)) return "0-300 mm, 0-600 mm, 0-1000 mm";
  if (/outside micrometer/.test(value)) return "0-25 mm, 25-50 mm, 50-75 mm, 75-100 mm";
  if (/depth micrometer/.test(value)) return "0-25 mm, 0-50 mm, 0-100 mm";
  if (/tubular inside micrometer/.test(value)) return "50-150 mm, 50-300 mm, 50-500 mm";
  if (/micrometer/.test(value)) return "0-25 mm, 25-50 mm";
  if (/bore/.test(value)) return "10-18.5 mm, 18-35 mm, 35-60 mm, 50-160 mm, 160-250 mm, 250-450 mm";
  if (/thickness gauge/.test(value)) return "0-1 mm, 0-10 mm, 0-12.7 mm, 0-25.4 mm";
  if (/dial indicator|digital indicator/.test(value)) return "0-1 mm, 0-10 mm, 0-12.7 mm, 0-25.4 mm";
  if (/steel tape rule|keychain tape|digital measuring tape/.test(value)) return "1 m, 2 m, 3 m, 5 m, 7.5 m, 8 m, 10 m";
  if (/tailor tape/.test(value)) return "1.5 m";
  if (/dip tape|open reel|leatherette tape|top line tape|fibreglass|metal wired|steel abs|kompakt|top gear tape/.test(value)) return "5 m, 7.5 m, 10 m, 15 m, 20 m, 30 m, 50 m, 100 m";
  if (/measuring wheel/.test(value)) return "0-10,000 m";
  if (/spirit level|aluminium level/.test(value)) return "300 mm, 450 mm, 600 mm, 900 mm, 1000 mm, 1200 mm, 1500 mm, 1800 mm, 2000 mm";
  if (/steel rule|steel ruler/.test(value)) return "150 mm, 300 mm, 600 mm, 1000 mm";
  if (/laser distance meter/.test(value)) return "40 m, 60 m, 100 m";
  if (/laser line level/.test(value)) return "25 m, 30 m";
  if (/video borescope/.test(value)) return "6 mm probe";
  return undefined;
}

const sources: Array<{ brand: string; items: SourceItem[] }> = [
  { brand: "Yamayo", items: yamayoNames },
  { brand: "Kency", items: kencyNames },
  { brand: "Freemans", items: freemansNames },
];

const byFamily = new Map<string, { name: string; brands: Set<string>; variants: Set<string> }>();
for (const source of sources) {
  for (const item of source.items) {
    const key = keyFor(item.name);
    const entry = byFamily.get(key) ?? { name: item.name, brands: new Set(), variants: new Set() };
    entry.brands.add(source.brand);
    entry.variants.add(item.name);
    byFamily.set(key, entry);
  }
}

export const measuringInstruments: CatalogMeasuringInstrument[] = [...byFamily.values()]
  .map((item, index) => {
    const brands = [...item.brands];
    const slug = slugify(item.name);
    const instrumentGroup = instrumentGroupFor(item.name);
    const availableSizes = sizeOptionsFor(item.name);
    return {
      id: `measuring-instrument-${slug}`,
      name: item.name,
      slug,
      code: `MI-${String(index + 1).padStart(3, "0")}`,
      category: "measuring-instruments" as const,
      description: `${item.name} from ${brands.join(" and ")} for precision measurement, inspection and professional industrial use. Available in multiple models, ranges and sizes.`,
      image: imageFor(item.name, brands[0], instrumentGroup),
      brand: brands[0],
      instrumentGroup,
      specifications: {
        Brand: brands.join(", "),
        "Product Type": item.name,
        Category: "Measuring Instruments",
        "Instrument Group": instrumentGroup,
        "Available Options": [...item.variants].join(", "),
        ...(availableSizes ? { "Available Sizes": availableSizes } : {}),
        Availability: "Multiple models, measuring ranges, sizes and variants",
        Application: "Precision measurement, quality control, inspection, workshop and industrial use",
      },
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export function getMeasuringInstrument(slug: string) {
  return measuringInstruments.find((product) => product.slug === slug);
}
