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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.36em] text-red-700 sm:text-sm">
            Browse Products
          </p>
          <h1 className="text-3xl font-bold text-black sm:text-4xl md:text-5xl">
            Product Categories
          </h1>
        </div>
        <Link
          href="/categories"
          className="hidden shrink-0 text-sm font-semibold text-red-700 transition hover:underline sm:block"
        >
          View All -&gt;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6">
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug.trim()}`}
            className="group block h-full"
          >
            <div className="flex h-full min-h-20 items-center rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md sm:min-h-24 sm:rounded-[1.35rem] sm:px-6">
              <div className="flex w-full items-center justify-between gap-5">
                <h2 className="text-base font-bold leading-snug text-black transition group-hover:text-red-700 sm:text-lg">
                  {category.name}
                </h2>
                <span className="shrink-0 text-base font-bold text-red-700 transition group-hover:translate-x-1">
                  -&gt;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
