export type CatalogHandTool = {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: "hand-tools";
  description: string;
  image: string;
  brand: string;
  material?: string;
  specifications: Record<string, string>;
};

const img = (name: string) => `/products/hand-tools/${name}`;

function applicationFor(name: string) {
  const value = name.toLowerCase();
  if (/(spanner|wrench|socket|allen key|screwdriver)/.test(value)) return "Fastening, loosening and mechanical assembly";
  if (/(hammer|mallet|chisel|punch)/.test(value)) return "Striking, shaping, fitting and workshop maintenance";
  if (/(plier|cutter|stripper|crimp|nipper|pincer|scissors|snip)/.test(value)) return "Gripping, cutting, stripping and installation work";
  if (/(clamp|vice)/.test(value)) return "Holding and securing workpieces";
  if (/(saw|drill|file|abrasive|tile)/.test(value)) return "Cutting, drilling and material finishing";
  if (/(caliper|measuring|square|rule|level)/.test(value)) return "Measurement, marking, alignment and inspection";
  if (/(garden|hedge|pruning|bill hook|rake|lopping|lopper|sickle|shear)/.test(value)) return "Garden, landscaping and pruning work";
  if (/(jack|lifting)/.test(value)) return "Automotive and workshop lifting support";
  if (/(spray|air gun|grease|oil can)/.test(value)) return "Workshop lubrication, spraying and pneumatic service";
  if (/(trowel|putty|scraper)/.test(value)) return "Masonry, plastering, painting and surface preparation";
  if (/(tool box|tool bag|tool kit|trolley)/.test(value)) return "Tool storage, organization and transport";
  return "Professional workshop, maintenance and industrial use";
}

const tool = (slug: string, name: string, code: string, image: string, brands: string, options: Record<string, string> = {}): CatalogHandTool => ({
  id: `hand-tool-${slug}`,
  name, slug, code, category: "hand-tools", image, brand: brands.split(",")[0].trim(),
  description: `${name} for professional workshop, maintenance, fabrication and industrial use. Available in the listed brands, models and sizes; contact Noor Agencies for current stock and a quotation.`,
  material: options.Material,
  specifications: {
    Brand: brands,
    "Product Type": name,
    Category: "Hand Tools",
    Application: options.Application ?? applicationFor(name),
    "Suitable For": "Professional, industrial, workshop and maintenance use",
    ...options,
  },
});

const rawHandTools: CatalogHandTool[] = [
  tool("adjustable-wrench", "Adjustable Wrench", "HT-AW", "/products/spanner.jpg", "Taparia, Kendo, King Tony, Generic", { Material: "Chrome vanadium steel", "Available Sizes": "100 mm, 150 mm, 200 mm, 250 mm, 300 mm, 375 mm, 450 mm, 600 mm", Finish: "Chrome plated or phosphated", Application: "General fastening and maintenance" }),
  tool("double-ended-open-jaw-spanner", "Double Ended Open Jaw Spanner", "HT-DEO", "/products/spanner.jpg", "Taparia, King Tony, Mech Care, Generic", { Material: "Chrome vanadium steel", "Available Sizes": "6 x 7 mm, 8 x 9 mm, 8 x 10 mm, 9 x 11 mm, 10 x 11 mm, 10 x 12 mm, 12 x 13 mm, 13 x 16 mm, 14 x 15 mm, 14 x 17 mm, 16 x 17 mm, 18 x 19 mm, 18 x 21 mm, 19 x 22 mm, 20 x 22 mm, 21 x 23 mm, 24 x 26 mm, 24 x 27 mm, 25 x 28 mm, 30 x 32 mm, 32 x 36 mm, 36 x 41 mm, 41 x 46 mm, 46 x 50 mm, 50 x 55 mm, 55 x 60 mm, 60 x 65 mm, 65 x 70 mm, 70 x 75 mm, 75 x 80 mm", "Available Options": "Individual, 6-piece set, 8-piece set, 10-piece set, 12-piece set", Finish: "Chrome plated or phosphated" }),
  tool("ring-spanner", "Ring Spanner", "HT-RSP", "/products/spanner.jpg", "Taparia, King Tony, Generic", { Material: "Chrome vanadium steel", "Available Sizes": "6 x 7 mm, 8 x 9 mm, 10 x 11 mm, 12 x 13 mm, 14 x 15 mm, 16 x 17 mm, 18 x 19 mm, 20 x 22 mm, 21 x 23 mm, 24 x 26 mm, 24 x 27 mm, 25 x 28 mm, 30 x 32 mm, 32 x 36 mm, 36 x 41 mm, 41 x 46 mm, 46 x 50 mm, 55 x 60 mm, 65 x 70 mm", "Available Options": "Individual, metric set, inch set, chrome plated, phosphated" }),
  tool("combination-spanner", "Combination Spanner", "HT-CSP", "/products/spanner.jpg", "Taparia, King Tony, Kendo", { Material: "Chrome vanadium steel", "Available Sizes": "6 mm, 7 mm, 8 mm, 9 mm, 10 mm, 11 mm, 12 mm, 13 mm, 14 mm, 15 mm, 16 mm, 17 mm, 18 mm, 19 mm, 20 mm, 21 mm, 22 mm, 23 mm, 24 mm, 25 mm, 26 mm, 27 mm, 28 mm, 30 mm, 32 mm, 33 mm, 34 mm, 35 mm, 36 mm, 38 mm, 40 mm, 41 mm, 42 mm, 44 mm, 46 mm, 48 mm, 50 mm", "Available Options": "Individual, set" }),
  tool("socket-set", "Socket Set", "HT-SKT", img("image32.png"), "Taparia, King Tony, Kendo, Hanbon, Smartzo, TAT, King Tools, Kingqueen", { Material: "Chrome vanadium steel", "Available Sizes": "1/4 inch, 3/8 inch, 1/2 inch drive", "Available Options": "10-piece, 12-piece, 25-piece, 32-piece, 46-piece, 94-piece set", Application: "Automotive and mechanical fastening" }),
  tool("impact-socket", "Impact Socket", "HT-ISK", img("image33.png"), "King Tony, Taparia, AMB", { Material: "Impact-grade alloy steel", "Available Sizes": "Metric sizes in 1/4 inch, 3/8 inch and 1/2 inch drive", "Available Options": "Standard, deep, Allen, Torx" }),
  tool("t-spanner", "T Spanner", "HT-TSP", img("image11.png"), "Taparia, Mech Care, Generic", { Material: "Chrome vanadium steel", "Available Sizes": "8 mm, 10 mm, 12 mm, 13 mm and other catalogue sizes" }),
  tool("l-spanner", "L Spanner", "HT-LSP", "/products/spanner.jpg", "Taparia", { Material: "Chrome vanadium steel", "Available Sizes": "18 mm, 19 mm, 21 mm", "Available Options": "Standard, jack-hole" }),
  tool("box-spanner", "Box Spanner", "HT-BSP", "/products/spanner.jpg", "Taparia", { Material: "Chrome vanadium steel", "Available Options": "Box spanner, tubular spanner, double-sided socket wrench", "Available Sizes": "6 x 7 mm, 8 x 9 mm, 10 x 11 mm, 12 x 13 mm, 14 x 15 mm, 16 x 17 mm, 18 x 19 mm, 20 x 22 mm, 21 x 23 mm, 24 x 26 mm, 24 x 27 mm, 25 x 28 mm, 27 x 30 mm, 27 x 33 mm, 27 x 27 mm, 30 x 30 mm, 30 x 32 mm, 32 x 32 mm, 32 x 33 mm, 33 x 33 mm" }),
  tool("half-moon-spanner", "Half Moon Spanner", "HT-HMS", "/products/spanner.jpg", "Taparia", { Material: "Chrome vanadium steel", "Available Sizes": "8 x 10 mm, 10 x 11 mm, 12 x 13 mm, 14 x 15 mm, 16 x 17 mm, 18 x 19 mm, 20 x 22 mm" }),
  tool("slogging-spanner", "Slogging Spanner", "HT-SLS", "/products/spanner.jpg", "Taparia", { "Available Options": "Open ended, ring, offset ring with box handle, offset ring with round handle", "Available Sizes": "24 mm, 27 mm, 30 mm, 32 mm, 34 mm, 36 mm, 38 mm, 41 mm, 46 mm, 50 mm, 55 mm, 60 mm, 65 mm, 70 mm, 75 mm, 80 mm, 85 mm, 90 mm, 95 mm, 100 mm, 105 mm, 110 mm, 115 mm, 120 mm, 125 mm, 130 mm, 135 mm, 140 mm, 145 mm, 150 mm, 155 mm, 160 mm" }),
  tool("single-ended-spanner", "Single Ended Open Jaw Spanner", "HT-SES", "/products/spanner.jpg", "Taparia", { Material: "Chrome vanadium steel", "Available Sizes": "19 mm, 24 mm, 30 mm, 32 mm, 36 mm, 38 mm, 41 mm, 46 mm, 50 mm, 55 mm, 60 mm, 65 mm, 70 mm, 75 mm, 80 mm, 85 mm, 90 mm, 95 mm, 100 mm, 105 mm, 110 mm, 115 mm, 120 mm, 125 mm, 130 mm, 135 mm" }),
  tool("pliers", "Pliers", "HT-PLI", img("image17.png"), "Taparia, Kendo, King Tony, Hanbon", { Material: "Forged carbon or chrome vanadium steel", "Available Sizes": "6 inch, 7 inch, 8 inch, 10 inch, 12 inch", "Available Options": "Combination, long nose, side cutting, fencing, slip joint, water pump, VDE insulated", Handle: "Insulated or comfort grip" }),
  tool("circlip-pliers", "Circlip Pliers", "HT-CIR", img("image18.png"), "Taparia, King Tony, Kendo", { Material: "Alloy steel", "Available Sizes": "Internal and external sizes", "Available Options": "Straight jaw, bent jaw, internal, external" }),
  tool("wire-stripper-crimping-tool", "Wire Stripper & Crimping Tool", "HT-WSC", img("image26.png"), "Taparia, Metso, Kendo, Mech Care", { "Available Options": "Automatic wire stripper, multifunction stripper, crimping plier, cable lug crimper", Application: "Electrical installation and maintenance" }),
  tool("nipper-pincer", "Nippers & Pincers", "HT-NIP", img("image18.png"), "Taparia, Dayton, Yamato", { "Available Options": "End cutting nipper, diagonal nipper, carpenter pincer, mini nipper", "Available Sizes": "Catalogue sizes" }),
  tool("cable-bolt-cutter", "Cable & Bolt Cutter", "HT-CUT", img("image26.png"), "Taparia, Pro Cut Tools, Kendo", { "Available Sizes": "8 inch to 42 inch", "Available Options": "Cable cutter, bolt cutter, wire rope cutter, tin cutter" }),
  tool("screwdriver", "Screwdriver", "HT-SDR", img("image13.png"), "Taparia, Kay-Kay, Fizzcut, Kendo, Hanbon, Mech Care", { Material: "Alloy steel blade", "Available Sizes": "Stubby, 4 inch, 6 inch, 8 inch, 10 inch, 12 inch", "Available Options": "Flat, Phillips, Torx, insulated, precision, 2-in-1, set" }),
  tool("line-tester", "Line Tester", "HT-LNT", img("image13.png"), "Taparia", { "Available Options": "Standard line tester, 2-in-1 line tester, digital tester", Application: "Electrical testing and basic voltage indication", "Suitable For": "Electricians, technicians and maintenance use" }),
  tool("screwdriver-bits", "Screwdriver Bits", "HT-SDB", img("image39.png"), "Taparia, King Tony, Kendo", { "Available Options": "Phillips, slotted, Pozidriv, Torx, hex and bit sets", "Available Sizes": "Catalogue tip and drive sizes" }),
  tool("allen-key-set", "Allen Key Set", "HT-ALK", img("image10.png"), "Taparia, Kendo, King Tony, Hanbon", { Material: "Hardened alloy steel", "Available Options": "Metric, inch, Torx, ball-end, folding set", Finish: "Black oxide or chrome plated" }),
  tool("nylon-soft-faced-hammer", "Nylon & Soft Faced Hammer", "HT-NHM", img("image8.png"), "Taparia, Chetak, PAT, Kendo", { "Available Sizes": "20 mm, 25 mm, 30 mm, 32 mm, 38 mm, 40 mm, 44 mm, 50 mm, 62 mm, 75 mm", "Available Options": "Nylon hammer, two-way mallet, three-way mallet, replaceable face" }),
  tool("rubber-hammer", "Rubber Hammer", "HT-RHM", img("image7.png"), "Kendo, Astro, Smart, Ultrafast", { "Available Sizes": "40 mm, 45 mm, 50 mm, 65 mm, 75 mm; 320 g to 680 g", "Available Options": "Black head, white head, PVC rubber" }),
  tool("sledge-hammer", "Sledge Hammer", "HT-SHM", img("image16.png"), "Taparia, Nector, Sharp, Sony", { "Available Sizes": "1 lb to 20 lb; 900 g to 9000 g", "Available Options": "With wooden handle, fiberglass handle, head only" }),
  tool("ball-pein-claw-hammer", "Ball Pein & Claw Hammer", "HT-BCH", img("image15.png"), "Taparia, Sony, Kendo", { "Available Sizes": "110 g to 800 g", "Available Options": "Ball pein, claw, cross pein, machinist, electrician" }),
  tool("g-f-c-clamp", "G, C & F Clamp", "HT-CLP", img("image27.png"), "Taparia, Vomb, Kendo", { Material: "Cast iron and steel", "Available Sizes": "2 inch to 12 inch; 55 mm to 600 mm opening", "Available Options": "G clamp, C clamp, light-duty F clamp, heavy-duty F clamp" }),
  tool("pipe-wrench", "Pipe Wrench", "HT-PWR", "/products/spanner.jpg", "Taparia, King Tony, Kendo", { "Available Sizes": "8 inch to 48 inch", "Available Options": "Stillson, heavy duty, aluminium, chain pipe wrench" }),
  tool("strap-filter-wrench", "Strap Filter Wrench", "HT-SFW", "/products/spanner.jpg", "Taparia", { "Available Size": "300 mm", "Grip Capacity": "Up to 200 mm" }),
  tool("torque-wrench", "Torque Wrench", "HT-TQW", img("image30.png"), "Taparia, King Tony, Kendo", { "Available Options": "Standard, ratchet type, preset and adjustable", Application: "Controlled torque tightening" }),
  tool("hacksaw-frame", "Hacksaw Frame & Blade", "HT-HSF", img("image52.png"), "Taparia, Hanbon, SEW, Kendo", { "Available Sizes": "Junior, 10 inch, 12 inch", "Available Options": "Tubular frame, square handle, blade" }),
  tool("chisel-punch", "Chisel & Punch", "HT-CHP", img("image44.png"), "Taparia, Revex, Kendo", { "Available Options": "Cold chisel, cape chisel, centre punch, pin punch, letter and number punch set", "Available Sizes": "Multiple widths and lengths" }),
  tool("octagonal-chisel", "Octagonal Chisel", "HT-OCH", img("image44.png"), "Taparia", { Material: "Hardened and tempered steel", "Available Sizes": "Catalogue widths and lengths", Application: "Heavy-duty chipping, cutting and demolition work" }),
  tool("sds-chisel", "SDS Chisel", "HT-SDS", img("image44.png"), "Taparia", { Material: "Hardened alloy steel", "Available Options": "Pointed, flat and specialist SDS profiles", "Available Sizes": "Catalogue SDS shank sizes and lengths", Application: "Powered chiselling and demolition work" }),
  tool("centre-drift-punch", "Centre & Drift Punch", "HT-CDP", img("image44.png"), "Taparia", { Material: "Hardened tool steel", "Available Options": "Centre punch, drift punch, individual and set", "Available Sizes": "Catalogue point diameters and lengths" }),
  tool("leather-punch", "Leather Punch", "HT-LHP", "", "Taparia", { Material: "Hardened tool steel", "Available Options": "Individual hollow punch and punch set", "Available Sizes": "Catalogue punch diameters", Application: "Punching leather, rubber, gasket and soft sheet materials" }),
  tool("pvc-pipe-snap-off-cutter", "PVC Pipe & Snap-Off Cutter", "HT-PSC", img("image14.png"), "Taparia", { "Available Options": "PVC pipe cutter, snap-off cutter", "Available Sizes": "Catalogue cutting capacities" }),
  tool("hand-riveter", "Hand Riveter & Rivet Nut Tool", "HT-RIV", img("image22.png"), "Taparia, Metso, Kendo, Hanbon", { "Available Options": "Hand riveter, lazy tong riveter, rivet nut kit", Application: "Sheet metal and fabrication" }),
  tool("grease-gun-oil-can", "Grease Gun & Oil Can", "HT-GGO", img("image25.png"), "Taparia, Servo, Kendo", { "Available Capacity": "500 g, 1 kg and bucket models", "Available Options": "Lever grease gun, bucket pump, oil can, rotary barrel pump" }),
  tool("tool-box-tool-kit", "Tool Box & Tool Kit", "HT-TBX", img("image31.png"), "Taparia, Strong Ali, Kendo, Hanbon", { "Available Options": "Plastic organizer, cantilever box, professional kit, universal kit, plumber kit, two-wheeler kit, trolley" }),
  tool("tool-bag", "Tool Bag", "HT-TBG", img("image31.png"), "Taparia", { "Available Options": "Soft tool bag and organizer bag", "Available Sizes": "Catalogue sizes" }),
  tool("tools-trolley", "Tools Trolley", "HT-TTR", img("image31.png"), "Taparia", { "Available Options": "5-drawer, 7-drawer, wheel set, handle" }),
  tool("hydraulic-jack", "Hydraulic Jack & Jack Stand", "HT-JAK", img("image50.png"), "Taparia, Leo, Gallop, Nice, 3T-Pro", { "Available Capacity": "2 ton, 3 ton, 5 ton, 8 ton, 10 ton, 16 ton, 20 ton", "Available Options": "Bottle jack, trolley jack, jack stand" }),
  tool("vernier-caliper", "Vernier Caliper", "HT-VCA", img("image42.png"), "Taparia, Aerospace, Precision Measuring", { Material: "Stainless steel", "Available Sizes": "0-150 mm, 0-200 mm, 0-300 mm", "Available Options": "Analogue, digital" }),
  tool("measuring-tape-level", "Measuring Tape & Spirit Level", "HT-MSL", img("image12.png"), "Taparia, Kendo, Vomb", { "Available Sizes": "3 m, 5 m, 7.5 m, 10 m and longer", "Available Options": "Pocket tape, long tape, magnetic spirit level, measuring wheel" }),
  tool("calipers-spring-dividers", "Calipers & Spring Dividers", "HT-CSD", img("image42.png"), "Taparia", { "Available Options": "Inside caliper, outside caliper, spring divider", "Available Sizes": "Catalogue sizes" }),
  tool("try-square-steel-rule", "Try Square & Steel Rule", "HT-TSR", img("image56.png"), "Taparia, Naveen, S.K.I, Vomb, Ajanta, Khyati", { Material: "Stainless steel", "Available Sizes": "4 inch to 48 inch", "Available Options": "Carpenter square, engineer square, steel rule" }),
  tool("masonry-trowel", "Masonry Trowel", "HT-MTR", img("image45.png"), "Generic, Vomb, KR", { "Available Options": "Plastering, texture, brick, pointing, gauging and finishing trowel", Handle: "Wooden or plastic" }),
  tool("putty-knife-scraper", "Putty Knife & Scraper", "HT-PKS", img("image45.png"), "Ambika, Taparia, Generic", { "Available Sizes": "3 inch, 4 inch, 6 inch, 8 inch, 10 inch", "Available Options": "Flexible putty knife, scraper" }),
  tool("garden-tool-set", "Garden Tool Set", "HT-GTS", "", "Generic", { "Available Options": "5-piece wooden-handle set, 5-piece plastic-handle set" }),
  tool("hedge-shear", "Hedge Shear", "HT-HDS", img("image59.png"), "Vomb, Generic", { "Available Sizes": "10 inch, 12 inch", Handle: "Wooden handle" }),
  tool("bill-hook", "Bill Hook (Aruval)", "HT-BHK", "", "United, Generic", { "Available Options": "Standard bill hook" }),
  tool("garden-hoe-fork", "Garden Hoe & Fork", "HT-GHF", "", "Generic", { "Available Options": "Garden fork, three-pin garden hoe" }),
  tool("garden-scissors", "Garden Scissors", "HT-GSC", img("image14.png"), "Generic", { "Available Options": "Double cut red handle, side cutter green, SK-5 green pack" }),
  tool("pruning-saw", "Pruning Saw", "HT-PRS", "", "Pro Cut", { "Available Options": "250 mm folding, 16 inch double teeth, 350 mm interchangeable blade, rope-type tree pruning saw", "Available Sizes": "250 mm, 350 mm, 16 inch, 2.7 m extension rod" }),
  tool("pruning-sickle", "Pruning Sickle", "HT-PRK", "", "Generic", { "Available Option": "Black, small, two-bolt" }),
  tool("garden-lopper", "Garden Lopper", "HT-GLP", "", "Pro Cut", { "Available Option": "Extendable type" }),
  tool("garden-rake", "Garden Rake", "HT-GRK", "", "Generic", { "Available Options": "15-teeth retractable, 12-teeth fixed yellow" }),
  tool("garden-sprayer", "Garden Sprayer", "HT-GSP", "", "V Star, Generic", { "Available Capacity": "2 litre, 5 litre, 10 litre", "Available Options": "Hand sprayer, bucket type" }),
  tool("adjustable-angle-shear", "Adjustable Angle Shear", "HT-AAS", img("image59.png"), "Generic", { "Available Option": "Adjustable angle" }),
  tool("paint-spray-air-gun", "Paint Spray & Air Gun", "HT-PSG", img("image30.png"), "Techno, THB, MAF Pro, MSI, XLNT, Indigo, Payal, Painter, Power", { "Available Options": "Gravity feed, suction feed, HVLP, texture gun, air blow gun, diesel spray gun", "Available Capacity": "125 ml, 400 ml, 600 ml, 3.5 L" }),
  tool("scissors-snips", "Scissors & Aviation Snips", "HT-SCI", img("image3.png"), "Rocket, Ultrafast, Taparia", { "Available Sizes": "5.2 inch to 12 inch", "Available Options": "Office scissors, straight-cut snips, left-cut snips, right-cut snips" }),
  tool("bearing-puller", "Bearing Puller", "HT-BPL", img("image2.png"), "Taparia, Kendo, Hanbon", { "Available Options": "Two-jaw, three-jaw, separator and puller set", Application: "Automotive and mechanical maintenance" }),
  tool("tile-cutter", "Tile Cutter", "HT-TIL", img("image46.png"), "KR Tile, RK Tile Cutter, Taparia", { "Available Sizes": "2 ft, 3 ft, 4 ft, 6 ft", "Available Options": "Manual rail cutter, tile cutting blade" }),
  tool("cutting-drill-accessories", "Cutting & Drill Accessories", "HT-CDA", img("image19.png"), "Taparia, Pro Cut Tools, Kendo", { "Available Options": "Masonry bit, HSS drill, hammer drill, hole saw, cut-off wheel, diamond blade, cup wheel" }),
  tool("steel-file", "Steel Files", "HT-SFL", img("image56.png"), "Taparia", { "Available Options": "Flat, hand, half-round, round, square, triangular and needle file sets", "Available Cuts": "Bastard, second cut, smooth" }),
  tool("hole-saw", "Hole Saw", "HT-HSW", img("image36.png"), "Taparia", { "Available Options": "Bimetal hole saw, deep hole saw, carbide-tip hole saw", "Available Sizes": "Catalogue diameters" }),
  tool("abrasive-wheel-disc", "Abrasive Wheels & Discs", "HT-AWD", img("image19.png"), "Taparia", { "Available Options": "Cut-off wheel, diamond blade, tile blade, wood blade, cup wheel, abrasive paper, Velcro disc", Series: "Gold and Silver series" }),
  tool("magnetic-tools", "Magnetic Tools", "HT-MAG", "", "Taparia, Status", { "Available Options": "Hand magnet, magnetic pickup and catalogue magnetic products" }),
  tool("carpenter-tools", "Carpenter Tools", "HT-CPT", img("image56.png"), "Taparia, Naveen, S.K.I", { "Available Options": "Try square, marking and general carpenter tools" }),
  tool("spoke-shave", "Spoke Shave", "HT-SSH", "", "Taparia", { Material: "Metal body with replaceable steel blade", "Available Options": "Spoke shave, spare blade", Application: "Shaping and smoothing curved wooden surfaces" }),
  tool("block-plane", "Block Plane", "HT-BLP", "", "Taparia", { Material: "Metal body with replaceable steel blade", "Available Options": "Block plane, spare blade", Application: "Trimming end grain and fine woodworking" }),
  tool("non-sparking-tools", "Non-Sparking Tools", "HT-NST", "", "Taparia", { Material: "Beryllium copper or aluminium bronze", "Available Options": "Adjustable wrench, pliers, cutters, hammers, spanners and specialist non-sparking tools" }),
  tool("bench-pipe-vice", "Bench & Pipe Vice", "HT-VIC", img("image4.png"), "Taparia, Kendo, Generic", { Material: "Cast iron and hardened steel", "Available Options": "Bench vice, pipe vice", "Available Sizes": "Multiple jaw widths and pipe capacities" }),
  tool("tape-dispenser-stapler", "Tape Dispenser & Manual Stapler", "HT-TDS", img("image29.png"), "Falcon, Omega, Ikon, Kangaroo, Lucky Numen, Miles", { "Available Sizes": "1 inch, 2 inch, 3 inch", "Available Options": "Hand dispenser, tabletop dispenser, manual stapler" }),
  ...(catalogHandToolsData as unknown as CatalogHandTool[]),
];

const FAMILY_ALIASES: Record<string, string> = {
  "hydraulic bottle jacks": "hydraulic bottle jack",
  "socket sets": "socket set",
  "screwdriver sets": "screwdriver set",
  "garden scissors": "garden scissors",
  "grease guns": "grease gun",
  "air blow guns": "air blow gun",
  "spray guns": "spray gun",
  "paint spray guns": "paint spray gun",
  "sledge hammers": "sledge hammer",
  "hacksaw frames": "hacksaw frame and blade",
  "hack saw frame": "hacksaw frame and blade",
  "pruning saws": "pruning saw",
  "garden tools set": "garden tool set",
  "garden hoe and forks": "garden hoe and fork",
  "garden sprayers": "garden sprayer",
  "tools bag": "tool bag",
  "vernier calipers": "vernier caliper",
  "trolley jacks": "trolley jack",
  "caulking guns": "caulking gun",
  "pvc pipe cutters": "pvc pipe cutter",
  "bolt cutters": "bolt cutter",
  "tape dispensers": "tape dispenser",
};

function familyKey(name: string) {
  const normalized = name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
  return FAMILY_ALIASES[normalized] ?? normalized;
}

function uniqueList(...values: Array<string | undefined>) {
  const items = values
    .flatMap((value) => value?.split(",") ?? [])
    .map((value) => value.trim())
    .filter(Boolean);
  return [...new Map(items.map((item) => [item.toLowerCase(), item])).values()].join(", ");
}

function mergeProducts(primary: CatalogHandTool, duplicate: CatalogHandTool): CatalogHandTool {
  const specifications = { ...primary.specifications };
  for (const [key, value] of Object.entries(duplicate.specifications)) {
    specifications[key] = specifications[key] ? uniqueList(specifications[key], value) : value;
  }

  const brands = uniqueList(primary.specifications.Brand, primary.brand, duplicate.specifications.Brand, duplicate.brand);
  specifications.Brand = brands;
  specifications["Product Type"] = primary.name;

  return {
    ...primary,
    image: primary.image || duplicate.image,
    brand: brands.split(",")[0]?.trim() || primary.brand,
    material: uniqueList(primary.material, duplicate.material) || undefined,
    specifications,
    description: `${primary.name} from all available catalogue brands, models, sizes and capacities. Contact Noor Agencies for current stock and a quotation.`,
  };
}

function cleanFamilySpecifications(product: CatalogHandTool, key: string): CatalogHandTool {
  if (key !== "hydraulic bottle jack") return product;

  const options = product.specifications["Available Options"] ?? "";
  const capacities = [...options.matchAll(/\b(\d+(?:\.\d+)?)\s*T\b/gi)]
    .map((match) => `${match[1]}T`)
    .filter((capacity, index, all) => all.indexOf(capacity) === index)
    .sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b));

  return {
    ...product,
    specifications: {
      ...product.specifications,
      "Available Options": capacities.join(", "),
    },
  };
}

const consolidatedByFamily = new Map<string, CatalogHandTool>();
const productAliases = new Map<string, CatalogHandTool>();
const slugsByFamily = new Map<string, string[]>();

for (const product of rawHandTools) {
  const key = familyKey(product.name);
  if (key === "2" || key === "brand") continue;
  slugsByFamily.set(key, [...(slugsByFamily.get(key) ?? []), product.slug]);
}

for (const product of rawHandTools) {
  const key = familyKey(product.name);
  if (key === "2" || key === "brand") continue;
  const existing = consolidatedByFamily.get(key);
  const consolidated = existing ? mergeProducts(existing, product) : product;
  consolidatedByFamily.set(key, consolidated);

}

for (const [key, product] of consolidatedByFamily) {
  consolidatedByFamily.set(key, {
    ...cleanFamilySpecifications(product, key),
    image: `/products/hand-tools/animated/${key.replace(/\s+/g, "-")}.png`,
  });
}

// Keep old links working even when their cards are consolidated into one family.
for (const [key, slugs] of slugsByFamily) {
  const consolidated = consolidatedByFamily.get(key);
  if (consolidated) for (const slug of slugs) productAliases.set(slug, consolidated);
}

export const handTools: CatalogHandTool[] = [...consolidatedByFamily.values()];

export function getHandTool(slug: string) {
  return productAliases.get(slug) ?? handTools.find((product) => product.slug === slug);
}
import catalogHandToolsData from "@/data/handToolsCatalog.generated.json";
