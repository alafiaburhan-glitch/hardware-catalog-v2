export type PackingMaterial = {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: "packaging-material";
  description: string;
  image: string;
  material?: string;
  specifications: Record<string, string>;
};

const image = (name: string) => `/products/packing-materials/${name}.webp`;

function packingMaterial(
  slug: string,
  name: string,
  code: string,
  material: string,
  application: string,
  specifications: Record<string, string> = {},
  assetName = slug,
): PackingMaterial {
  return {
    id: `packing-material-${slug}`,
    name,
    slug,
    code,
    category: "packaging-material",
    description: `${name} for packing, protection, storage and industrial dispatch applications. Select an available variant and contact Noor Agencies for current availability and a quotation.`,
    image: image(assetName),
    material,
    specifications: {
      Category: "Packing Material",
      Material: material,
      Application: application,
      "Suitable For": "Warehouses, workshops, manufacturing, transport and commercial packing",
      ...specifications,
    },
  };
}

export const packingMaterials: PackingMaterial[] = [
  packingMaterial("bopp-tape", "BOPP Packing Tape", "PM-BOPP", "Biaxially oriented polypropylene film", "Carton sealing, bundling and dispatch packing", {
    "Available Sizes": "1 inch, 2 inch, 3 inch",
    "Available Length": "50 m, 100 m",
    "Available Options": "Transparent, brown",
  }),
  packingMaterial("stretch-film", "Stretch Film", "PM-STF", "Linear low-density polyethylene film", "Pallet wrapping, load stabilization and dust protection", {
    "Available Sizes": "3 inch, 4 inch, 6 inch, 8 inch, 10 inch, 12 inch, 18 inch, 20 inch, 20 inch machine roll, 24 inch",
  }),
  packingMaterial("pp-strap", "PP Packing Strap", "PM-PPS", "Polypropylene", "Carton strapping, bundling and load securing", {
    "Available Sizes": "12 mm light, 12 mm heavy, 19 mm heavy",
  }),
  packingMaterial("blue-roll", "Blue Packing Roll", "PM-BLR", "Flexible polyethylene sheet", "Surface protection, wrapping and industrial packing"),
  packingMaterial("black-mulching-sheet", "Black Mulching Sheet", "PM-BMS", "Black polyethylene film", "Ground covering, moisture retention and weed suppression", {
    "Available Length": "400 m",
  }),
  packingMaterial("bubble-sheet", "Bubble Sheet", "PM-BBS", "Air-cell polyethylene", "Cushioning fragile products during packing and transport"),
  packingMaterial("tar-roll", "Tar Roll", "PM-TAR", "Bituminous waterproof membrane", "Moisture protection, wrapping and waterproof covering"),
  packingMaterial("aluminium-tar-roll", "Aluminium Tar Roll", "PM-ATR", "Aluminium-faced bituminous membrane", "Reflective waterproofing and protective covering"),
  packingMaterial("weed-mat", "Weed Mat", "PM-WMT", "Woven polypropylene", "Landscape weed control and ground stabilization", {
    "Available Length": "100 m",
  }),
  packingMaterial("packing-masking-tape", "Masking Tape", "PM-MST", "Crepe paper with pressure-sensitive adhesive", "Painting, surface masking, labeling and light bundling", {
    "Available Sizes": "1/2 inch, 3/4 inch, 1 inch, 1 1/2 inch, 2 inch, 3 inch",
  }, "masking-tape"),
  packingMaterial("packing-ptfe-thread-seal-tape", "PTFE Thread Seal Tape", "PM-PTF", "Polytetrafluoroethylene", "Thread sealing for plumbing, pneumatic and general fitting work", {
    "Available Sizes": "1/2 inch, 3/4 inch",
  }, "teflon-tape"),
  packingMaterial("fiber-mesh", "Fiber Mesh", "PM-FBM", "Fiberglass mesh", "Joint reinforcement, crack repair and surface preparation", {
    "Available Sizes": "4 inch, 6 inch, 40 inch",
  }),
  packingMaterial("packing-floor-marking-tape", "Floor Marking Tape", "PM-FMT", "Durable vinyl film", "Warehouse lanes, safety zones and floor identification", {
    "Available Sizes": "2 inch, 3 inch",
    "Available Options": "Red, yellow, black, black-yellow hazard stripe",
  }, "floor-marking-tape"),
  packingMaterial("white-foam-roll", "White Foam Roll", "PM-WFR", "Closed-cell polyethylene foam", "Cushioning, wrapping and interleaving delicate products", {
    "Available Sizes": "3 mm x 135 m, 4 mm x 100 m, 5 mm x 80 m",
  }),
];

export function getPackingMaterial(slug: string) {
  return packingMaterials.find((product) => product.slug === slug);
}
