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
