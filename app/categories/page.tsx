import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function CategoriesPage() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    return (
      <div className="p-10">
        Failed to load categories
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-red-700 mb-3">
          All Categories
        </h1>

        <p className="text-gray-600">
          Browse all available product categories
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug.trim()}`}
          >
            <div className="border-2 border-red-700 rounded-2xl p-6 hover:bg-red-700 hover:text-white transition cursor-pointer">
              <h2 className="text-lg font-semibold">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}