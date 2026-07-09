import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Categories | Noor Agencies",
  description:
    "Browse all industrial hardware product categories at Noor Agencies, including ropes, tarpaulins, lifting slings, safety products, power tools, and more.",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.36em] text-red-700 sm:text-sm">
            Browse Products
          </p>
          <h1 className="text-3xl font-bold text-black sm:text-4xl">
            Product Categories
          </h1>
        </div>
        <Link
          href="/categories"
          className="hidden shrink-0 text-sm font-semibold text-red-700 transition hover:underline sm:block"
        >
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug.trim()}`}
            className="group block h-full"
          >
            <div className="flex h-full min-h-24 items-center rounded-[22px] border border-gray-200 bg-white px-7 py-5 shadow-[0_2px_6px_rgba(15,23,42,0.08)] transition-colors duration-200 hover:border-red-200">
              <div className="flex w-full items-center justify-between gap-4">
                <h2 className="text-[16px] font-bold leading-snug text-black transition group-hover:text-red-700 sm:text-[17px]">
                  {category.name}
                </h2>
                <span className="shrink-0 text-sm font-bold text-red-700 transition group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
