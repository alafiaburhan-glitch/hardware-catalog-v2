import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BrandProductsClient from "@/components/BrandProductsClient";
import { getCategoryBrand, productMatchesBrand } from "@/lib/categoryBrandGroups";
import { handTools } from "@/data/handTools";
import { getPowerToolsSection } from "@/data/powerTools";
import CategoryPageClient from "@/components/CategoryPageClient";
import { sortProductsAlphabetically } from "@/lib/sortProducts";
import { measuringInstruments } from "@/data/measuringInstruments";
import { agriTools } from "@/data/agriTools";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string; brand: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, brand: brandSlug } = await params;
  if (slug === "power-tools" && ["accessories", "spare-parts"].includes(brandSlug)) {
    const name = brandSlug === "accessories" ? "Power Tools Accessories" : "Power Tools Spare Parts";
    return { title: `${name} in Coimbatore`, description: `Browse ${name.toLowerCase()} available from Noor Agencies in Coimbatore.` };
  }
  const brand = getCategoryBrand(slug, brandSlug);

  if (!brand) {
    return {
      title: "Brand",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageUrl = `https://www.nooragencies.in/categories/${slug}/${brand.slug}`;
  const title = `${brand.name} Products in Coimbatore`;
  const description = `Browse ${brand.name} products available from Noor Agencies in Coimbatore. Contact us for availability, product details and bulk enquiries.`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${title} | Noor Agencies`,
      description,
      url: pageUrl,
    },
    twitter: {
      card: "summary",
      title: `${title} | Noor Agencies`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug: rawSlug, brand: rawBrandSlug } = await params;
  const slug = rawSlug.trim();
  const brandSlug = rawBrandSlug.trim();
  if (slug === "power-tools" && ["accessories", "spare-parts"].includes(brandSlug)) {
    const isAccessories = brandSlug === "accessories";
    const products = sortProductsAlphabetically(
      getPowerToolsSection(isAccessories ? "power-tools-accessories" : "power-tools-spare-parts"),
    );
    const name = isAccessories ? "Power Tools Accessories" : "Power Tools Spare Parts";
    return <CategoryPageClient slug={slug} categoryName={name} initialProducts={products} seoDescription={`Browse all ${name.toLowerCase()} grouped by product family, brand and available model.`} />;
  }
  const brand = getCategoryBrand(slug, brandSlug);

  if (!brand) {
    notFound();
  }

  const { data: category } = await supabase
    .from("categories")
    .select("name")
    .eq("slug", slug)
    .single();

  const { data: databaseProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug);

  const products = slug === "hand-tools"
    ? [
        ...handTools,
        ...(databaseProducts ?? []).filter(
          (product) => !handTools.some((catalogProduct) => catalogProduct.slug === product.slug),
        ),
      ]
    : slug === "measuring-instruments"
      ? [
          ...measuringInstruments,
          ...(databaseProducts ?? []).filter(
            (product) => !measuringInstruments.some((catalogProduct) => catalogProduct.slug === product.slug),
          ),
        ]
    : slug === "agri-tools"
      ? [
          ...agriTools,
          ...(databaseProducts ?? []).filter(
            (product) => !agriTools.some((catalogProduct) => catalogProduct.slug === product.slug),
          ),
        ]
      : (databaseProducts ?? []);

  const matchingProducts = sortProductsAlphabetically(
    products.filter((product) => productMatchesBrand(product, brand)),
  );

  return (
    <BrandProductsClient
      categoryName={category?.name ?? slug.replace(/-/g, " ")}
      categorySlug={slug}
      brandName={brand.name}
      products={matchingProducts}
    />
  );
}
