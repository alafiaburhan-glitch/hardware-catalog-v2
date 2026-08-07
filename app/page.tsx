import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import type { CategorySummary, FeaturedProduct } from "@/components/HomePageClient";
import { createClient } from "@/lib/supabase-server";
import localCategories from "@/data/categories";
import { mergeSearchCatalog } from "@/lib/searchCatalog";
import { siteFaqs } from "@/data/siteFaqs";
import { jsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Noor Agencies | Industrial Hardware Supplier in Coimbatore",
  description:
    "Noor Agencies supplies emery paper, emery rolls, Loctite adhesives, tarpaulins, shade nets, ropes, hoses, safety products and industrial hardware in Coimbatore.",
  alternates: {
    canonical: "/",
  },
};

const featuredProductSlugs = [
  "wd-40",
  "loctite-243",
  "emery-roll",
  "pvc-suction-hose",
  "webbing-sling",
  "hdpe-tarpaulin",
  "duct-tape",
  "telescopic-ladder",
];

export default async function HomePage() {
  const supabase = await createClient();
  const [categoryResult, productResult] = await Promise.all([
    supabase.from("categories").select("id, name, slug").order("name"),
    supabase.from("products").select("id, name, code, image, slug, category, brand, description, specifications, featured").order("name"),
  ]);

  const legacyEmerySlugs = new Set(["emery-paper", "emery-papers", "emery-roll", "emery-rolls"]);
  const categories: CategorySummary[] = (categoryResult.data ?? []).filter(
    (category) =>
      category.slug?.trim() &&
      !legacyEmerySlugs.has(category.slug.trim().toLowerCase()),
  );
  const requiredCategories = localCategories;
  for (const category of requiredCategories) {
    if (!categories.some((item) => item.slug?.trim() === category.slug)) categories.push({ id: `local-${category.slug}`, ...category });
  }
  categories.sort((first, second) => first.name.localeCompare(second.name));

  const databaseProducts = productResult.data ?? [];
  const fullCatalog = mergeSearchCatalog(databaseProducts);
  const catalogBySlug = new Map(fullCatalog.map((product) => [product.slug, product]));
  const curatedProducts = featuredProductSlugs.flatMap((slug) => {
    const product = catalogBySlug.get(slug);
    return product ? [product] : [];
  });
  const databaseFeaturedProducts = databaseProducts.flatMap((product) => {
    const slug = product.featured ? product.slug?.trim() : null;
    const catalogProduct = slug ? catalogBySlug.get(slug) : null;
    return catalogProduct ? [catalogProduct] : [];
  });
  const products: FeaturedProduct[] = [
    ...new Map(
      [...curatedProducts, ...databaseFeaturedProducts, ...fullCatalog].map(
        (product) => [product.slug, product],
      ),
    ).values(),
  ].slice(0, 8);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
    <HomePageClient categories={categories} products={products} totalProductCount={fullCatalog.length} />
  </>;
}
