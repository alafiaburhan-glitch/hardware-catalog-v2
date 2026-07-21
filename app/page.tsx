import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import type { CategorySummary, FeaturedProduct } from "@/components/HomePageClient";
import { createClient } from "@/lib/supabase-server";
import localCategories from "@/data/categories";
import { mergeSearchCatalog } from "@/lib/searchCatalog";
import { siteFaqs } from "@/data/siteFaqs";

export const metadata: Metadata = {
  title: "Noor Agencies | Industrial Hardware Supplier in Coimbatore",
  description:
    "Noor Agencies supplies emery paper, emery rolls, Loctite adhesives, tarpaulins, shade nets, ropes, hoses, safety products and industrial hardware in Coimbatore.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const supabase = await createClient();
  const [categoryResult, productResult] = await Promise.all([
    supabase.from("categories").select("id, name, slug").order("name"),
    supabase.from("products").select("id, name, code, image, slug, category, brand, description, specifications, featured").order("name"),
  ]);

  const categories: CategorySummary[] = (categoryResult.data ?? []).filter((category) => category.slug?.trim());
  const requiredCategories = localCategories;
  for (const category of requiredCategories) {
    if (!categories.some((item) => item.slug?.trim() === category.slug)) categories.push({ id: `local-${category.slug}`, ...category });
  }
  categories.sort((first, second) => first.name.localeCompare(second.name));

  const databaseProducts = productResult.data ?? [];
  const fullCatalog = mergeSearchCatalog(databaseProducts);
  let products: FeaturedProduct[] = databaseProducts.filter((product) => product.featured && product.slug?.trim()).slice(0, 8);
  if (products.length === 0) {
    products = fullCatalog.slice(0, 8);
  }

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
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <HomePageClient categories={categories} products={products} totalProductCount={fullCatalog.length} />
  </>;
}
