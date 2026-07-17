import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import CategoryPageClient from "@/components/CategoryPageClient";
import BrandCategoryClient from "@/components/BrandCategoryClient";
import { getCategoryBrands, productMatchesBrand } from "@/lib/categoryBrandGroups";
import { handTools } from "@/data/handTools";
import { getPowerToolsSection } from "@/data/powerTools";
import PowerToolsCategoryClient from "@/components/PowerToolsCategoryClient";
import { pneumaticBrassFittings } from "@/data/pneumaticBrassFittings";
import { sortProductsAlphabetically } from "@/lib/sortProducts";
import { measuringInstruments } from "@/data/measuringInstruments";
import { agriTools } from "@/data/agriTools";

export const dynamic = "force-dynamic";

const categorySeo: Record<string, { title: string; description: string }> = {
  "emery-papers": {
    title: "Emery Paper in Coimbatore",
    description:
      "Buy emery paper in Coimbatore from Noor Agencies. We supply industrial emery sheets for sanding, surface preparation, deburring, metal work and workshop use.",
  },
  "emery-roll": {
    title: "Emery Roll Supplier in Coimbatore",
    description:
      "Noor Agencies supplies emery rolls in Coimbatore in multiple grit options for sanding, metal finishing, fabrication and workshop use.",
  },
  "industrial-adhesives-sealants": {
    title: "Industrial Adhesives & Sealants Supplier in Coimbatore",
    description:
      "Loctite, Fevicol and Araldite adhesives and sealants supplier in Coimbatore. Contact Noor Agencies for industrial bonding, threadlocking, flooring, foam and epoxy adhesive products.",
  },
  "hand-tools": {
    title: "Hand Tools Supplier in Coimbatore",
    description:
      "Hand tools supplier in Coimbatore. Noor Agencies supplies spanners, workshop tools and industrial hand tools for maintenance, repair and factory use.",
  },
  "power-tools": {
    title: "Power Tools Supplier in Coimbatore",
    description:
      "Power tools supplier in Coimbatore for construction, fabrication, maintenance and industrial use. Contact Noor Agencies for available brands and models.",
  },
  "pneumatic-brass-fittings": {
    title: "Pneumatic & Brass Fittings Supplier in Coimbatore",
    description:
      "Browse pneumatic components, brass fittings, stainless steel fittings, valves, FRL units, couplings and pneumatic tools from Noor Agencies in Coimbatore.",
  },
  "measuring-instruments": {
    title: "Measuring Instruments Supplier in Coimbatore",
    description:
      "Browse Kency, Yamayo and Freemans measuring instruments, precision tools, measuring tapes, gauges, calipers, micrometers and levels from Noor Agencies in Coimbatore.",
  },
  "agri-tools": {
    title: "Tata Agrico Agricultural Tools Supplier in Coimbatore",
    description: "Browse Tata Agrico axes, hoes, hammers, pickaxes, sickles, shovels, crowbars, chisels, rotavator blades, chaff cutters and tiller shoes from Noor Agencies in Coimbatore.",
  },
  ropes: {
    title: "Industrial Rope Supplier in Coimbatore",
    description:
      "Industrial rope supplier in Coimbatore for lifting, safety, packing, workshop and commercial applications. Contact Noor Agencies for availability.",
  },
  hoses: {
    title: "Industrial Hose Supplier in Coimbatore",
    description:
      "Industrial hose supplier in Coimbatore offering PVC hoses, braided hoses, suction hoses, air hoses, spray hoses and related hose products.",
  },
  "safety-products": {
    title: "Safety Products Supplier in Coimbatore",
    description:
      "Safety products supplier in Coimbatore for industrial, workshop, construction and maintenance requirements. Contact Noor Agencies for product availability.",
  },
  "lifting-equipments": {
    title: "Lifting Equipment Supplier in Coimbatore",
    description:
      "Lifting equipment supplier in Coimbatore offering webbing slings, ratchet lashings, magnetic lifters and industrial lifting accessories.",
  },
  "ladders-sections": {
    title: "Ladder Supplier in Coimbatore",
    description:
      "Ladder supplier in Coimbatore offering aluminium ladders, step ladders and telescopic ladders for industrial, commercial and maintenance use.",
  },
  "heat-insulation": {
    title: "Heat Insulation Material Supplier in Coimbatore",
    description:
      "Heat insulation material supplier in Coimbatore. Noor Agencies supplies ceramic blankets, glass wool and insulation products for industrial use.",
  },
  "lubricants-sealants": {
    title: "Lubricants and Sealants Supplier in Coimbatore",
    description:
      "Noor Agencies supplies industrial lubricants and sealants in Coimbatore for maintenance, repair, assembly and workshop applications.",
  },
  "packaging-material": {
    title: "Packaging Material Supplier in Coimbatore",
    description:
      "Packaging material supplier in Coimbatore offering tapes and industrial packaging supplies for warehouses, workshops, dispatch and commercial use.",
  },
  tapes: {
    title: "Industrial Tape Supplier in Coimbatore",
    description:
      "Industrial tape supplier in Coimbatore offering masking tape, duct tape, foam tape, floor marking tape, reflective tape and other adhesive tapes.",
  },
  tarpaulins: {
    title: "Tarpaulin Supplier in Coimbatore",
    description:
      "Tarpaulin supplier in Coimbatore offering HDPE and PVC tarpaulins for waterproof covering, transport, storage, agriculture and outdoor protection.",
  },
  "shade-nets": {
    title: "Shade Net Supplier in Coimbatore",
    description:
      "Shade net supplier in Coimbatore for nurseries, farms, gardens, parking areas, construction sites and outdoor work zones. Contact Noor Agencies.",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.trim();

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("name")
    .eq("slug", slug)
    .single();

  const isLocalCategory = slug === "pneumatic-brass-fittings" || slug === "measuring-instruments" || slug === "agri-tools";
  const categoryDoesNotExist = !categoryError || categoryError.code === "PGRST116";
  if (!category && !isLocalCategory && categoryDoesNotExist) {
    notFound();
  }

  const name = category?.name ?? slug.replace(/-/g, " ");
  const seo = categorySeo[slug] ?? {
    title: `${name} Supplier in Coimbatore`,
    description: `Browse industrial ${name.toLowerCase()} products from Noor Agencies, a trusted industrial hardware supplier in Coimbatore.`,
  };
  const pageUrl = `https://www.nooragencies.in/categories/${slug}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${seo.title} | Noor Agencies`,
      description: seo.description,
      url: pageUrl,
    },
    twitter: {
      card: "summary",
      title: `${seo.title} | Noor Agencies`,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.trim();

  const { data: category } = await supabase
    .from("categories")
    .select("name, faqs")
    .eq("slug", slug)
    .single();

  const { data: databaseProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug);

  // Hand tools are intentionally grouped by tool family, with brands and
  // models exposed as options instead of creating a separate card per brand.
  const products = sortProductsAlphabetically(slug === "hand-tools"
    ? [
        ...handTools,
        ...(databaseProducts ?? []).filter(
          (product) => !handTools.some((catalogProduct) => catalogProduct.slug === product.slug),
        ),
      ]
    : slug === "power-tools"
      ? [...getPowerToolsSection("power-tools"), ...(databaseProducts ?? []).filter((product) => !getPowerToolsSection("power-tools").some((catalogProduct) => catalogProduct.slug === product.slug))]
      : slug === "pneumatic-brass-fittings"
        ? [...pneumaticBrassFittings, ...(databaseProducts ?? []).filter((product) => !pneumaticBrassFittings.some((catalogProduct) => catalogProduct.slug === product.slug))]
        : slug === "measuring-instruments"
          ? [...measuringInstruments, ...(databaseProducts ?? []).filter((product) => !measuringInstruments.some((catalogProduct) => catalogProduct.slug === product.slug))]
        : slug === "agri-tools"
          ? [...agriTools, ...(databaseProducts ?? []).filter((product) => !agriTools.some((catalogProduct) => catalogProduct.slug === product.slug))]
        : (databaseProducts ?? []));

  const categoryName = category?.name ?? (slug === "pneumatic-brass-fittings"
    ? "Pneumatic & Brass Fittings"
    : slug === "measuring-instruments"
      ? "Measuring Instruments"
    : slug === "agri-tools"
      ? "Agri Tools"
    : slug.replace(/-/g, " "));
  const seoDescription =
    categorySeo[slug]?.description ??
    `Browse industrial ${categoryName.toLowerCase()} products from Noor Agencies, a trusted industrial hardware supplier in Coimbatore.`;
  const brandGroups = getCategoryBrands(slug);

  if (slug === "power-tools") {
    return <PowerToolsCategoryClient products={products} />;
  }

  if (brandGroups.length > 0) {
    const brandsWithCounts = brandGroups.map((brand) => ({
      ...brand,
      productCount: products.filter((product) => productMatchesBrand(product, brand)).length,
    }));
    const directProducts = slug === "hand-tools"
      ? products.filter(
          (product) => !brandGroups.some((brand) => productMatchesBrand(product, brand)),
        )
      : [];

    return (
      <BrandCategoryClient
        categoryName={categoryName}
        categorySlug={slug}
        seoDescription={seoDescription}
        brands={brandsWithCounts}
        directProducts={directProducts}
      />
    );
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName,
    url: `https://www.nooragencies.in/categories/${slug}`,
    description: seoDescription,
    isPartOf: {
      "@type": "WebSite",
      name: "Noor Agencies",
      url: "https://www.nooragencies.in",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.nooragencies.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: "https://www.nooragencies.in/categories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `https://www.nooragencies.in/categories/${slug}`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryName} Products`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: products.length,
    itemListElement:
      products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.nooragencies.in/products/${product.slug}`,
        name: product.name,
      })) ?? [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
      <CategoryPageClient
        slug={slug}
        categoryName={categoryName}
        initialProducts={products}
        seoDescription={seoDescription}
        faqs={category?.faqs ?? []}
      />
    </>
  );
}
