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
    url: "https://nooragencies.in/categories", 
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories?.map((category) => (
        <Link key={category.id} href={`/categories/${category.slug.trim()}`}>
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-200 transition-all duration-300 px-6 py-5 flex items-center justify-between group">

    <span className="font-semibold text-gray-900 group-hover:text-red-700 transition">
      {category.name}
    </span>

    <span className="text-red-700 text-lg font-bold group-hover:translate-x-1 transition">
      →
    </span>

  </div>
</Link>
   
        ))}
      </div>
    </div>
  );
}