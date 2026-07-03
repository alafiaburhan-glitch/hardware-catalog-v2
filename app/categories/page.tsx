import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Categories | Noor Agencies",
  description:
    "Browse all industrial hardware product categories at Noor Agencies — ropes, tarpaulins, lifting slings, safety products, power tools, and more.",
  openGraph: {
    title: "Product Categories | Noor Agencies",
    description:
      "Browse all industrial hardware product categories at Noor Agencies.",
    url: "https://hardware-catalog-v2.vercel.app/categories",
  },
};

export default async function CategoriesPage() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    return <div className="p-10">Failed to load categories</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-sm">
          Browse
        </p>
        <h1 className="text-4xl font-bold mb-3">All Categories</h1>
        <p className="text-gray-600">Browse all available product categories</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug.trim()}`}>
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:border-red-200 hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold group-hover:text-red-700 transition">
                  {category.name}
                </h2>
                <span className="text-red-700 text-xl font-bold group-hover:translate-x-1 transition">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}