import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import SearchClient from "@/components/SearchClient";
import { getSearchCatalog } from "@/lib/searchCatalog";
import localCategories from "@/data/categories";

export const metadata: Metadata = {
  title: "Search Products",
  description: "Search the Noor Agencies industrial hardware catalogue.",
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const products = await getSearchCatalog();

  const { data: categories } = await supabase
    .from("categories")
    .select("name, slug")
    .order("name");

  const legacyEmerySlugs = new Set(["emery-paper", "emery-papers", "emery-roll", "emery-rolls"]);
  const filterCategories = (categories ?? []).filter(
    (category) => !legacyEmerySlugs.has(category.slug.trim().toLowerCase()),
  );
  for (const category of localCategories) {
    if (!filterCategories.some((item) => item.slug === category.slug)) {
      filterCategories.push(category);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-red-700 font-semibold uppercase tracking-[0.2em] mb-2">
          Search
        </p>
        <h1 className="text-4xl font-bold">Find Products</h1>
        <p className="text-gray-500 mt-2">
          Search by product name or filter by category
        </p>
      </div>

      <SearchClient
        products={products}
        categories={filterCategories}
        initialQuery={q ?? ""}
      />
    </main>
  );
}
