import fs from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const envText = await fs.readFile(new URL("../.env.local", import.meta.url), "utf8");
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const separator = line.indexOf("=");
      return [line.slice(0, separator), line.slice(separator + 1)];
    }),
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
);

const categories = [
  { name: "Agri Tools", slug: "agri-tools", faqs: [] },
  { name: "Floor Mats", slug: "floor-mats", faqs: [] },
  { name: "Industrial Chemicals", slug: "industrial-chemicals", faqs: [] },
  { name: "Measuring Instruments", slug: "measuring-instruments", faqs: [] },
  { name: "Valves & Watering Equipment", slug: "valves-watering-equipment", faqs: [] },
];

const product = (name, code, slug, category, description, specifications = {}, extra = {}) => ({
  name,
  code,
  slug,
  category,
  description,
  image: "",
  material: "",
  size: "",
  weight: "",
  box_contents: `1 ${name}`,
  datasheet_url: "",
  specifications,
  size_images: {},
  featured: false,
  faqs: [],
  ...extra,
});

const products = [
  product("Pressure Washer Outlet Hose", "PWOH", "pressure-washer-outlet-hose", "hoses", "Replacement high-pressure outlet hose for compatible pressure washers and cleaning equipment.", {
    "Available Lengths": "7 m, 10 m, 15 m, 20 m",
    Application: "Pressure washer outlet connection",
    Type: "High-pressure washer hose",
  }, { size: "7 m, 10 m, 15 m, 20 m" }),
  product("Isopropyl Alcohol", "IPA-5L", "isopropyl-alcohol", "industrial-chemicals", "Isopropyl alcohol for industrial cleaning, degreasing, surface preparation, and maintenance applications.", {
    "Available Size": "5 L",
    Application: "Cleaning, degreasing and surface preparation",
    Type: "Industrial cleaning solvent",
  }, { size: "5 L", material: "Isopropyl alcohol" }),
  product("Hydraulic Bottle Jack", "HBJ", "hydraulic-bottle-jack", "lifting-equipments", "Hydraulic bottle jack for vehicle lifting, workshop maintenance, and general service applications.", {
    "Available Sizes": "3 ton, 5 ton, 8 ton, 10 ton, 16 ton, 20 ton",
    Application: "Vehicle and workshop lifting",
    Type: "Hydraulic bottle jack",
  }, { size: "3 ton, 5 ton, 8 ton, 10 ton, 16 ton, 20 ton" }),
  product("Scissor Jack", "SCJ", "scissor-jack", "lifting-equipments", "Compact mechanical scissor jack for vehicle lifting and roadside maintenance.", {
    "Available Models": "CE 400, CE 650, CE 1000",
    Application: "Vehicle lifting and wheel-change support",
    Type: "Mechanical scissor jack",
  }, { size: "CE 400, CE 650, CE 1000" }),
  product("Jack Handle", "JACK-HANDLE", "jack-handle", "lifting-equipments", "Replacement jack handle for operating compatible workshop and vehicle jacks.", {
    "Available Options": "Small, Big",
    Application: "Operating compatible jacks",
    Type: "Jack accessory",
  }, { size: "Small, Big" }),
  product("Noodle Mat", "NOODLE-MAT", "noodle-mat", "floor-mats", "Green noodle mat for entrances, work areas, shops, and general floor covering.", {
    Colour: "Green",
    "Approximate Size": "1.2 m x 4 m",
    Application: "Entrance and floor covering",
  }, { size: "1.2 m x 4 m", material: "PVC" }),
  product("Rubber Compound Tape", "RCT", "rubber-compound-tape", "tapes", "Rubber compound tape for insulation, sealing, cable repair, and general maintenance work.", {
    Application: "Insulation, sealing and cable repair",
    Type: "Rubber compound tape",
  }, { material: "Rubber compound" }),
  product("Cordless Storm Blower", "CSB", "cordless-storm-blower", "power-tools", "Cordless storm blower for workshop cleaning, dust removal, and general maintenance.", {
    "Available Colours": "Blue, Black, Yellow",
    Power: "Cordless",
    Application: "Dust removal and workshop cleaning",
  }, { size: "Blue, Black, Yellow" }),
  product("Cordless Leaf Blower", "CLB", "cordless-leaf-blower", "power-tools", "Cordless leaf blower for clearing leaves, dust, and light debris.", {
    "Available Options": "Blue, Yellow (MAF Pro)",
    Power: "Cordless",
    Application: "Leaf, dust and light-debris clearing",
  }, { size: "Blue, Yellow (MAF Pro)" }),
  product("Cordless Pressure Washer", "CPW-BLUE", "cordless-pressure-washer", "power-tools", "Blue cordless pressure washer for portable vehicle, outdoor, and general cleaning.", {
    Colour: "Blue",
    Power: "Cordless",
    Application: "Portable pressure washing",
  }),
  product("Tuqo Pressure Washer", "TUQO-PW", "tuqo-pressure-washer", "power-tools", "Tuqo pressure washer for vehicle, outdoor, and workshop cleaning applications.", {
    Brand: "Tuqo",
    "Available Models": "HW 2020, HW 2050",
    Application: "Pressure washing and cleaning",
  }, { size: "HW 2020, HW 2050" }),
  product("Mitsuki Pressure Washer MI8", "MITSUKI-MI8", "mitsuki-pressure-washer-mi8", "power-tools", "Mitsuki MI8 pressure washer for vehicle, outdoor, and workshop cleaning applications.", {
    Brand: "Mitsuki",
    Model: "MI8",
    Application: "Pressure washing and cleaning",
  }, { size: "MI8" }),
  product("48V Power Tool Battery", "BAT-48V", "48v-power-tool-battery", "power-tools", "Replacement 48V rechargeable battery for compatible cordless power tools.", {
    Voltage: "48 V",
    Application: "Compatible cordless power tools",
    Type: "Replacement battery",
  }, { size: "48 V" }),
  product("Concrete Vibrator Needle", "CVN-35", "concrete-vibrator-needle", "power-tools", "Concrete vibrator needle for compaction and removal of trapped air from freshly poured concrete.", {
    "Available Lengths": "1.5 m, 3 m",
    Diameter: "35 mm",
    Application: "Concrete compaction",
  }, { size: "1.5 m x 35 mm, 3 m x 35 mm" }),
  product("Cotton Gloves", "COT-GLOVE", "cotton-gloves", "safety-products", "Cotton work gloves for handling, workshop, maintenance, and light industrial tasks.", {
    "Available Weights": "50 g, 70 g",
    Application: "General handling and light-duty protection",
    Type: "Cotton work gloves",
  }, { size: "50 g, 70 g", material: "Cotton" }),
  product("Welding Gloves", "WELD-GLOVE-RED", "welding-gloves-bright-red", "safety-products", "Bright red welding gloves for heat, spark, and abrasion protection during welding and fabrication.", {
    Colour: "Bright red",
    Application: "Welding and fabrication",
    Type: "Protective welding gloves",
  }),
  product("Disposable Mask", "DISP-MASK", "disposable-mask", "safety-products", "Disposable face mask for general hygiene, dust reduction, and workplace use.", {
    Application: "General workplace hygiene and dust reduction",
    Type: "Disposable mask",
  }),
  product("Disposable Head Cap", "DISP-CAP", "disposable-head-cap", "safety-products", "Disposable head cap for hygiene control in workshops, food handling, healthcare, and clean work areas.", {
    Application: "Hygiene and contamination control",
    Type: "Disposable head cover",
  }),
  product("Angular Shear", "ANG-SHEAR", "angular-shear", "hand-tools", "Manual angular shear for controlled cutting and trimming in fabrication and workshop tasks.", {
    Application: "Cutting and trimming",
    Type: "Manual shear",
  }),
  product("Butane Flame Torch", "BUTANE-TORCH", "butane-flame-torch", "hand-tools", "Portable butane flame torch for heating, brazing, soldering, and workshop use.", {
    "Available Options": "Brass, White",
    Fuel: "Butane",
    Application: "Heating, brazing and soldering",
  }, { size: "Brass, White" }),
  product("Aluminium Sausage Caulking Gun", "CAULK-SAUSAGE", "aluminium-sausage-caulking-gun", "hand-tools", "Aluminium sausage caulking gun for controlled application of sealants and adhesives.", {
    Construction: "Aluminium",
    Application: "Sausage-pack sealant application",
    Type: "Caulking gun",
  }, { material: "Aluminium" }),
  product("Hanbon Multifunctional Circlip Plier", "HANBON-CIRCLIP", "hanbon-multifunctional-circlip-plier", "hand-tools", "Hanbon multifunctional circlip plier for installing and removing internal and external retaining rings.", {
    Brand: "Hanbon",
    Application: "Internal and external circlips",
    Type: "Multifunctional circlip plier",
  }),
  product("Drain Clog Stick", "DRAIN-STICK", "drain-clog-stick", "hand-tools", "Flexible drain clog stick for removing hair and debris from household and workshop drains.", {
    Application: "Drain cleaning and clog removal",
    Type: "Drain cleaning tool",
  }),
  product("Screw Extractor Set 5 Piece", "SCREW-EXT-5PC", "screw-extractor-set-5-piece", "hand-tools", "Five-piece screw extractor set for removing damaged, stripped, or broken screws and fasteners.", {
    "Set Contents": "5 pieces",
    Application: "Damaged screw and fastener removal",
    Type: "Screw extractor set",
  }, { size: "5 piece", box_contents: "5 screw extractors" }),
  product("Sink Installer Tool", "SINK-INSTALLER", "sink-installer-tool", "hand-tools", "Multipurpose sink installer tool for tightening and loosening fittings in confined plumbing spaces.", {
    Application: "Sink, basin and plumbing fitting installation",
    Type: "Plumbing installation tool",
  }),
  product("Impact Socket Set 10 Piece", "IMPACT-SOCKET-10PC", "impact-socket-set-10-piece", "hand-tools", "Ten-piece impact socket set for compatible impact wrenches and heavy-duty fastening work.", {
    "Set Contents": "10 pieces",
    Application: "Impact fastening and removal",
    Type: "Impact socket set",
  }, { size: "10 piece", box_contents: "10 impact sockets" }),
  product("TAT Ratchet Socket Set 12 Piece", "TAT-RATCHET-12PC", "tat-ratchet-socket-set-12-piece", "hand-tools", "TAT twelve-piece ratchet socket set for general mechanical and workshop fastening.", {
    Brand: "TAT",
    "Set Contents": "12 pieces",
    Type: "Ratchet socket set",
  }, { size: "12 piece" }),
  product("TATNAD T-Type Socket Set 13 Piece", "TATNAD-T-13PC", "tatnad-t-type-socket-set-13-piece", "hand-tools", "TATNAD thirteen-piece T-type socket set for general mechanical and workshop fastening.", {
    Brand: "TATNAD",
    "Set Contents": "13 pieces",
    Type: "T-type socket set",
  }, { size: "13 piece" }),
  product("SRUNV Socket Set 32 Piece", "SRUNV-SOCKET-32PC", "srunv-socket-set-32-piece", "hand-tools", "SRUNV thirty-two-piece socket set for mechanical repair and workshop fastening.", {
    Brand: "SRUNV",
    "Set Contents": "32 pieces",
    Type: "Socket set",
  }, { size: "32 piece" }),
  product("Smartzo Socket Set 46 Piece", "SMARTZO-SOCKET-46PC", "smartzo-socket-set-46-piece", "hand-tools", "Smartzo forty-six-piece socket set for mechanical repair and workshop fastening.", {
    Brand: "Smartzo",
    "Set Contents": "46 pieces",
    Type: "Socket set",
  }, { size: "46 piece" }),
  product("Thread Maker Tool", "THREAD-MAKER", "thread-maker-tool", "hand-tools", "Thread maker tool for repairing or creating threads in workshop and maintenance applications.", {
    Application: "Thread cutting and repair",
    Type: "Threading tool",
  }),
  product("Voltage Test Pencil", "VOLT-TEST-PENCIL", "voltage-test-pencil", "hand-tools", "Compact voltage test pencil for basic electrical checking and maintenance.", {
    Application: "Basic voltage detection",
    Type: "Electrical test tool",
  }),
  product("Work Light Torch", "WORK-LIGHT", "work-light-torch", "hand-tools", "Portable work light and torch for inspections, repairs, emergencies, and low-light work areas.", {
    Application: "Inspection and work-area illumination",
    Type: "Portable work light",
  }),
  product("Kendo Combination Plier 8 Inch", "KENDO-10103", "kendo-combination-plier-8-inch", "hand-tools", "Kendo 8-inch combination plier for gripping, bending, twisting, and cutting.", {
    Brand: "Kendo",
    Model: "10103",
    Size: "8 inch",
  }, { size: "8 inch" }),
  product("Kendo Long Nose Plier 8 Inch", "KENDO-10302", "kendo-long-nose-plier-8-inch", "hand-tools", "Kendo 8-inch long nose plier for precision gripping, bending, and access in confined spaces.", {
    Brand: "Kendo",
    Model: "10302",
    Size: "8 inch",
  }, { size: "8 inch" }),
  product("Kendo G Clamp", "KENDO-G-CLAMP", "kendo-g-clamp", "hand-tools", "Kendo G clamp for secure holding during woodworking, metalworking, assembly, and repair.", {
    Brand: "Kendo",
    "Available Sizes": "125 mm (5 inch), 150 mm (6 inch), 200 mm (8 inch)",
    "Available Models": "40605, 40603, 40608",
  }, { size: "125 mm, 150 mm, 200 mm" }),
  product("Kendo Spring Clamp", "KENDO-SPRING-CLAMP", "kendo-spring-clamp", "hand-tools", "Kendo spring clamp for quick holding, positioning, gluing, and light assembly work.", {
    Brand: "Kendo",
    "Available Sizes": "100 mm, 150 mm",
    "Available Models": "40102, 40103",
  }, { size: "100 mm, 150 mm" }),
  product("Kendo White Rubber Hammer", "KENDO-RUBBER-HAMMER", "kendo-white-rubber-hammer", "hand-tools", "Kendo white rubber hammer for non-marring assembly, alignment, flooring, and fitting work.", {
    Brand: "Kendo",
    "Available Weights": "450 g, 680 g",
    "Available Models": "25501, 25511",
  }, { size: "450 g, 680 g", material: "Rubber" }),
  product("Kendo 2-Way Mallet Hammer 40 mm", "KENDO-25513", "kendo-2-way-mallet-hammer-40mm", "hand-tools", "Kendo 40 mm two-way mallet hammer for assembly, alignment, and controlled non-marring impact.", {
    Brand: "Kendo",
    Model: "25513",
    "Head Size": "40 mm",
  }, { size: "40 mm" }),
  product("Kendo T Spanner 12 mm", "KENDO-15904", "kendo-t-spanner-12mm", "hand-tools", "Kendo 12 mm T spanner for controlled fastening and access to recessed nuts and bolts.", {
    Brand: "Kendo",
    Model: "15904",
    Size: "12 mm",
  }, { size: "12 mm" }),
  product("Kendo Tool Box 19 Inch", "KENDO-90257", "kendo-tool-box-19-inch", "hand-tools", "Kendo 19-inch tool box for organized storage and transport of hand tools and accessories.", {
    Brand: "Kendo",
    Model: "90257",
    Size: "19 inch",
  }, { size: "19 inch" }),
  product("TATNAD Power Scissors", "TATNAD-POWER-SCISSORS", "tatnad-power-scissors", "hand-tools", "TATNAD power scissors for fast cutting of compatible sheet and craft materials.", {
    Brand: "TATNAD",
    Application: "Powered cutting",
    Type: "Power scissors",
  }),
  product("TATNAD SK-5 Cutter Knife", "TATNAD-SK5-KNIFE", "tatnad-sk5-cutter-knife", "hand-tools", "TATNAD cutter knife with SK-5 blade for packaging, trimming, and general cutting.", {
    Brand: "TATNAD",
    "Blade Material": "SK-5 steel",
    "Pack Size": "24 pieces",
  }, { material: "SK-5 steel", box_contents: "24 cutter knives" }),
  product("Labour Saving Wrench", "LABOUR-WRENCH", "labour-saving-wrench", "hand-tools", "Labour-saving wrench for high-torque fastening and loosening in mechanical and vehicle work.", {
    Application: "High-torque fastening and loosening",
    Type: "Torque multiplier wrench",
  }),
  product("Chakra Crimping Tool HSC8 6-4", "CHAKRA-HSC8-6-4", "chakra-crimping-tool-hsc8-6-4", "hand-tools", "Chakra HSC8 6-4 crimping tool for secure crimping of compatible wire ferrules and terminals.", {
    Brand: "Chakra",
    Model: "HSC8 6-4",
    Application: "Wire ferrule and terminal crimping",
  }, { size: "HSC8 6-4" }),
  product("Vernier Caliper", "VERNIER-CALIPER", "vernier-caliper", "measuring-instruments", "Vernier caliper for precise internal, external, depth, and step measurement.", {
    "Available Sizes": "8 inch, 12 inch",
    "Available Types": "Manual, Digital",
    Application: "Precision dimensional measurement",
  }, { size: "8 inch, 12 inch" }),
  product("Measuring Tape", "MEASURING-TAPE", "measuring-tape", "measuring-instruments", "Measuring tape range for construction, workshop, installation, surveying, and general measurement.", {
    "Available Brands": "Kendo, Freemans",
    "Available Sizes": "3 m, 5 m, 10 m",
    "Available Options": "Kendo 35011 (3 m), Freemans Ikon (5 m), Freemans Basik (5 m), Freemans Fiberglass (10 m)",
    "Pack Options": "Kendo 3 m: single; Freemans 5 m: pack of 10; Freemans Fiberglass 10 m: pack of 5",
    Application: "Construction, workshop, installation, surveying and general measurement",
  }, { size: "3 m, 5 m, 10 m", material: "Steel blade or fiberglass, depending on selected option", box_contents: "Measuring tape; pack quantity depends on selected option" }),
  product("Tata Shovel SVL022", "TATA-SVL022", "tata-shovel-svl022", "agri-tools", "Tata shovel for digging, lifting soil, construction, farming, and general outdoor work.", {
    Brand: "Tata",
    Model: "SVL022",
    Application: "Digging and material handling",
  }),
  product("Tata Crowbar", "TATA-CROWBAR", "tata-crowbar", "agri-tools", "Tata crowbar for prying, digging, breaking, and heavy-duty site work.", {
    Brand: "Tata",
    "Available Sizes": "25 x 1220 mm, 25 x 1650 mm",
    "Available Models": "CWB015, CWB028",
  }, { size: "25 x 1220 mm, 25 x 1650 mm" }),
  product("Generic Hoe 9 x 12 Inch", "HOE-9X12", "generic-hoe-9x12-inch", "agri-tools", "General-purpose 9 x 12 inch hoe for soil preparation, weeding, and cultivation.", {
    Size: "9 x 12 inch",
    Application: "Soil preparation and weeding",
    Type: "Agricultural hoe",
  }, { size: "9 x 12 inch" }),
  product("Wooden Hoe Handle", "HOE-HANDLE-WOOD", "wooden-hoe-handle", "agri-tools", "Replacement wooden handle for compatible agricultural hoes.", {
    Material: "Wood",
    Application: "Replacement hoe handle",
    Type: "Agricultural tool spare",
  }, { material: "Wood" }),
  product("VOMB Hand Scissors 12 Inch", "VOMB-SCISSORS-12", "vomb-hand-scissors-12-inch", "hand-tools", "VOMB 12-inch hand scissors for general cutting, workshop, and packaging use.", {
    Brand: "VOMB",
    Size: "12 inch",
    Application: "General cutting",
  }, { size: "12 inch" }),
  product("CI Ball Valve", "CI-BALL-VALVE", "ci-ball-valve", "valves-watering-equipment", "Cast iron ball valve for compatible water and industrial flow-control lines.", {
    Material: "Cast iron",
    "Available Sizes": "1/2 inch, 1 inch",
    Type: "Ball valve",
  }, { size: "1/2 inch, 1 inch", material: "Cast iron" }),
  product("PVC Pasted Ball Valve", "PVC-PASTED-BV", "pvc-pasted-ball-valve", "valves-watering-equipment", "PVC pasted ball valve for compatible water lines, irrigation, and utility plumbing.", {
    Material: "PVC",
    "Available Size": "1 inch",
    Type: "Pasted ball valve",
  }, { size: "1 inch", material: "PVC" }),
  product("Mini Brass Ball Valve", "MINI-BRASS-BV", "mini-brass-ball-valve", "valves-watering-equipment", "Compact brass mini ball valve for pneumatic, water, and general utility connections.", {
    Material: "Brass",
    "Available Sizes": "1/4 inch, 3/8 inch, 1/2 inch, 1/4 inch female x 8 mm",
    Type: "Mini ball valve",
  }, { size: "1/4 inch, 3/8 inch, 1/2 inch, 1/4 inch female x 8 mm", material: "Brass" }),
  product("Brass Ball Valve", "BRASS-BV-1-1-4", "brass-ball-valve", "valves-watering-equipment", "Brass ball valve for water, air, and compatible industrial utility lines.", {
    Material: "Brass",
    "Available Size": "1-1/4 inch",
    Type: "Ball valve",
  }, { size: "1-1/4 inch", material: "Brass" }),
  product("Brass Non-Return Valve", "BRASS-NRV", "brass-non-return-valve", "valves-watering-equipment", "Brass non-return valve for preventing reverse flow in compatible water and utility lines.", {
    Material: "Brass",
    "Available Size": "1/2 inch",
    Type: "Non-return valve",
  }, { size: "1/2 inch", material: "Brass" }),
  product("Brass Foot Valve", "BRASS-FOOT-VALVE", "brass-foot-valve", "valves-watering-equipment", "Brass foot valve for pump suction lines, water systems, and compatible utility applications.", {
    Material: "Brass",
    "Available Sizes": "1/2 inch, 3/4 inch",
    Type: "Foot valve",
  }, { size: "1/2 inch, 3/4 inch", material: "Brass" }),
  product("Metal Water Spray Gun", "METAL-WATER-GUN", "metal-water-spray-gun", "valves-watering-equipment", "Metal water spray gun for garden watering, vehicle washing, and general cleaning.", {
    Material: "Metal",
    Application: "Watering and washing",
    Type: "Water spray gun",
  }, { material: "Metal" }),
  product("Plastic 8-Pattern Water Gun", "WATER-GUN-8P", "plastic-8-pattern-water-gun", "valves-watering-equipment", "Plastic water gun with eight selectable spray patterns for garden watering and cleaning.", {
    Material: "Plastic",
    "Spray Patterns": "8",
    Application: "Watering and washing",
  }, { material: "Plastic" }),
  product("Hose Quick Release Coupling", "QRC-HOSE", "hose-quick-release-coupling", "valves-watering-equipment", "Quick release coupling for fast connection and disconnection of compatible water hoses and accessories.", {
    "Available Sizes": "1/2 inch, 3/4 inch",
    Application: "Hose and watering accessory connection",
    Type: "Quick release coupling",
  }, { size: "1/2 inch, 3/4 inch" }),
  product("Black Nozzle Water Gun", "BLACK-NOZZLE-GUN", "black-nozzle-water-gun", "valves-watering-equipment", "Black nozzle water gun for garden watering, vehicle washing, and general cleaning.", {
    Colour: "Black",
    Application: "Watering and washing",
    Type: "Water spray gun",
  }),
  product("Green Brass Head Water Gun", "GREEN-BRASS-GUN", "green-brass-head-water-gun", "valves-watering-equipment", "Green water gun with brass head for garden watering, vehicle washing, and general cleaning.", {
    Colour: "Green",
    "Head Material": "Brass",
    Application: "Watering and washing",
  }, { material: "Brass and polymer" }),
  product("Pro Cut Water Gun", "PRO-CUT-WATER-GUN", "pro-cut-water-gun", "valves-watering-equipment", "Pro Cut water gun for garden watering, vehicle washing, and general cleaning.", {
    "Available Colours": "Yellow, Orange",
    Application: "Watering and washing",
    Type: "Water spray gun",
  }, { size: "Yellow, Orange" }),
];

const { data: existingCategories, error: categoryReadError } = await supabase
  .from("categories")
  .select("slug");
if (categoryReadError) throw categoryReadError;

const categorySlugs = new Set(existingCategories.map(({ slug }) => slug));
const missingCategories = categories.filter(({ slug }) => !categorySlugs.has(slug));
if (missingCategories.length) {
  const { error } = await supabase.from("categories").insert(missingCategories);
  if (error) throw error;
}

const { data: existingProducts, error: productReadError } = await supabase
  .from("products")
  .select("slug");
if (productReadError) throw productReadError;

const productSlugs = new Set(existingProducts.map(({ slug }) => slug));
const missingProducts = products.filter(({ slug }) => !productSlugs.has(slug));
if (missingProducts.length) {
  const { error } = await supabase.from("products").insert(missingProducts);
  if (error) throw error;
}

console.log(JSON.stringify({
  requestedProducts: products.length,
  insertedProducts: missingProducts.length,
  skippedExistingProducts: products.length - missingProducts.length,
  insertedCategories: missingCategories.map(({ slug }) => slug),
}, null, 2));
