import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BrandProductsClient from "@/components/BrandProductsClient";
import { getCategoryBrand, productMatchesBrand } from "@/lib/categoryBrandGroups";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string; brand: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, brand: brandSlug } = await params;
  const brand = getCategoryBrand(slug, brandSlug);

  if (!brand) {
    return { title: "Brand | Noor Agencies" };
  }

  return {
    title: `${brand.name} Products | Noor Agencies`,
    description: `Browse ${brand.name} products available from Noor Agencies.`,
    alternates: {
      canonical: `https://nooragencies.in/categories/${slug}/${brand.slug}`,
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug: rawSlug, brand: rawBrandSlug } = await params;
  const slug = rawSlug.trim();
  const brandSlug = rawBrandSlug.trim();
  const brand = getCategoryBrand(slug, brandSlug);

  if (!brand) {
    notFound();
  }

  const { data: category } = await supabase
    .from("categories")
    .select("name")
    .eq("slug", slug)
    .single();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug);

  const matchingProducts = (products ?? []).filter((product) =>
    productMatchesBrand(product, brand)
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
