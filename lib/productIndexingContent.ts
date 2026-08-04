type ProductIndexingContent = {
  description: string;
  overview: string;
  selectionGuide: string;
};

type ProductForIndexing = {
  name: string;
  description?: string | null;
  category?: string | null;
  brand?: string | null;
  material?: string | null;
  specifications?: Record<string, unknown> | null;
};

const productIndexingContent: Readonly<Record<string, ProductIndexingContent>> = {
  "wesaf-premium-butane-gas": {
    description:
      "Wesaf Premium Butane Gas 225 g refill in Coimbatore for compatible gas torches, burners and workshop tools. Contact Noor Agencies for current availability.",
    overview:
      "Wesaf Premium Butane Gas is a 225 g refill can for compatible butane-powered torches, burners and workshop equipment. Noor Agencies supplies this workshop consumable from its store on Dr. Nanjappa Road in Coimbatore for professional maintenance, repair, fabrication and installation work.",
    selectionGuide:
      "Confirm that your tool is designed for a standard butane refill can and follow the tool manufacturer's refilling and safety instructions. Contact Noor Agencies to confirm current stock and compatibility before ordering.",
  },
  "elephant-air-chuck": {
    description:
      "Elephant air chuck for connecting an air line to tyre valves during inflation in garages, workshops and vehicle service operations. Enquire in Coimbatore.",
    overview:
      "An air chuck provides the final connection between a compressed-air hose and a tyre valve. This Elephant model is intended for routine tyre inflation and pressure-service work in garages, workshops, fleet maintenance areas and industrial service bays.",
    selectionGuide:
      "Confirm the valve connection, air-line fitting and working-pressure requirement before ordering. Noor Agencies can help match the chuck to the hose, coupler and inflator arrangement already used in your workshop.",
  },
  "ring-spanner": {
    description:
      "Ring spanners in metric and inch sizes for secure fastening in automotive, machinery and maintenance work. Taparia and King Tony options in Coimbatore.",
    overview:
      "A ring spanner encloses the fastener head to provide broad contact and a secure grip. It is suited to automotive repair, machinery assembly and maintenance jobs where access permits the closed ring to pass over the nut or bolt head.",
    selectionGuide:
      "Choose the exact metric or inch size required and check whether you need an individual tool or a matched set. Available ranges include common workshop sizes, with chrome-plated and phosphated options depending on the selected brand and model.",
  },
  "slogging-spanner": {
    description:
      "Heavy-duty slogging spanners from 24–160 mm for high-torque industrial fasteners. Open-ended and offset ring options available in Coimbatore.",
    overview:
      "A slogging spanner is designed for large, tight fasteners that require impact-assisted turning. The reinforced striking end can be driven with a hammer while the jaw or ring remains engaged, making it suitable for heavy machinery, plant maintenance and fabrication work.",
    selectionGuide:
      "Select the fastener size and head style first. Options include open-ended, ring and offset-ring patterns with box or round handles across a 24–160 mm range; the correct pattern depends on access around the fastener and the required striking clearance.",
  },
  "combination-spanner": {
    description:
      "Combination spanners from 6–50 mm with open jaw and ring ends for workshop, automotive and machinery maintenance. Available in Coimbatore.",
    overview:
      "A combination spanner places an open jaw and a ring end of the same size on one tool. The open end is useful for positioning and quick access, while the ring end gives more complete contact for final tightening or loosening.",
    selectionGuide:
      "Choose an individual size for replacement or frequent-use work, or a set for broader maintenance coverage. The listed range covers 6–50 mm, with Taparia, King Tony and Kendo options subject to current stock.",
  },
  "double-side-polyester-tape": {
    description:
      "Double-sided polyester tape in 12 mm and 24 mm widths for mounting, labels, lamination and industrial assembly. Available from Noor Agencies, Coimbatore.",
    overview:
      "Double-sided polyester tape creates a neat bond without visible mechanical fasteners. Its polyester carrier supports mounting, label attachment, lamination, packaging and general industrial assembly where a thin, consistent adhesive layer is preferred.",
    selectionGuide:
      "Available widths include 12 mm and 24 mm. Before ordering, consider the two surface materials, cleanliness, operating temperature and whether the application needs short-term positioning or a lasting bond.",
  },
  "double-ended-open-jaw-spanner": {
    description:
      "Double-ended open-jaw spanners in 6×7–75×80 mm sizes for fastening where side access is needed. Individual tools and sets in Coimbatore.",
    overview:
      "A double-ended open-jaw spanner provides two adjacent sizes in one tool and approaches a fastener from the side. It is practical for pipework, machinery, fabrication and general maintenance where overhead clearance prevents use of a socket or ring.",
    selectionGuide:
      "Match both jaw sizes to the fasteners used on the job. The range extends from 6 × 7 mm to 75 × 80 mm and includes individual spanners plus 6-, 8-, 10- and 12-piece sets, with finish and brand options subject to availability.",
  },
};

function readableCategory(category?: string | null) {
  return (category || "industrial hardware").replace(/-/g, " ");
}

function specification(product: ProductForIndexing, ...names: string[]) {
  const entries = Object.entries(product.specifications ?? {});
  const match = entries.find(([key]) => names.some((name) => key.toLowerCase() === name.toLowerCase()));
  return match?.[1] ? String(match[1]).trim() : "";
}

export function getProductIndexingContent(slug: string, product?: ProductForIndexing | null): ProductIndexingContent | undefined {
  const curated = productIndexingContent[slug];
  if (curated || !product) return curated;

  const category = readableCategory(product.category);
  const brand = product.brand || specification(product, "Brand");
  const application = specification(product, "Application", "Suitable For");
  const type = specification(product, "Type", "Product Type") || product.material || "";
  const options = specification(
    product,
    "Available Options",
    "Available Sizes",
    "Available Size",
    "Available Capacity",
    "Available Length",
    "Available Grit",
  );

  const suppliedDescription = product.description?.trim();
  const description = suppliedDescription && /coimbatore/i.test(suppliedDescription)
    ? suppliedDescription
    : `${product.name} supplier in Coimbatore for industrial, workshop and commercial requirements. Contact Noor Agencies for current availability and a quotation.`;

  const details = [
    brand ? `Available brand: ${brand}.` : "",
    type && type.toLowerCase() !== product.name.toLowerCase() ? `Product type: ${type}.` : "",
    application ? `Typical applications include ${application.charAt(0).toLowerCase()}${application.slice(1)}.` : "",
  ].filter(Boolean).join(" ");

  return {
    description,
    overview: `${product.name} is part of our ${category} range supplied from Noor Agencies in Coimbatore. ${details || "It is intended for professional maintenance, repair, fabrication, installation or general industrial use."}`,
    selectionGuide: options
      ? `Available selections include ${options}. Confirm the required size, model, material or capacity for your application and contact Noor Agencies for current stock.`
      : `Confirm the required specification, size, material and intended application before ordering. Noor Agencies can help identify a suitable option and confirm current stock in Coimbatore.`,
  };
}
