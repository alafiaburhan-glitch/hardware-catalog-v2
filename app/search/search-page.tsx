import SearchClient from "@/components/SearchClient";
import { getSearchCatalog } from "@/lib/searchCatalog";
import localCategories from "@/data/categories";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const products = await getSearchCatalog();
  const categoryNames = new Map(localCategories.map((category) => [category.slug, category.name]));
  for (const product of products) {
    if (product.category && !categoryNames.has(product.category)) {
      categoryNames.set(product.category, product.category.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()));
    }
  }
  const categories = [...categoryNames].map(([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name));

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
        categories={categories}
        initialQuery={q ?? ""}
      />
    </main>
  );
}
