import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import localCategories from "@/data/categories";

export const metadata: Metadata = {
  title: "Industrial Hardware Product Categories in Coimbatore",
  description:
    "Browse industrial hardware product categories from Noor Agencies in Coimbatore, including emery paper, Loctite adhesives, tarpaulins, shade nets, ropes, hoses and safety products.",
  alternates: {
    canonical: "https://www.nooragencies.in/categories",
  },
  openGraph: {
    title: "Industrial Hardware Product Categories in Coimbatore | Noor Agencies",
    description:
      "Browse emery paper, Loctite adhesives, tarpaulins, shade nets and industrial hardware categories from Noor Agencies.",
    url: "https://www.nooragencies.in/categories",
  },
};

const categoryIcons: Record<string, string> = {
  "emery-paper": "/category-icons/emery-papers.png",
  "emery-papers": "/category-icons/emery-papers.png",
  "emery-roll": "/category-icons/emery-roll.png",
  "emery-rolls": "/category-icons/emery-roll.png",
  "hand-tools": "/category-icons/hand-tools.png",
  "power-tools": "/category-icons/power-tools.png",
  ropes: "/category-icons/ropes.png",
  hoses: "/category-icons/hoses.png",
  "safety-products": "/category-icons/safety-products.png",
  "lifting-equipment": "/category-icons/lifting-equipment.png",
  "lifting-equipments": "/category-icons/lifting-equipments.png",
  "lifting-slings": "/category-icons/lifting-slings.png",
  "shade-nets": "/category-icons/shade-nets.png",
  tarpaulins: "/category-icons/tarpaulins.png",
  ladders: "/category-icons/ladders-sections.png",
  "ladders-sections": "/category-icons/ladders-sections.png",
  "heat-insulation": "/category-icons/heat-insulation.png",
  "industrial-adhesives": "/category-icons/industrial-adhesives.png",
  "industrial-adhesives-sealants":
    "/category-icons/industrial-adhesives-sealants.png",
  "lubricants-sealants": "/category-icons/lubricants-sealants.png",
  "packaging-material": "/category-icons/packaging-material.png",
  tapes: "/category-icons/tapes.png",
  "pneumatic-brass-fittings": "/category-icons/pneumatic-brass-fittings.png",
  "measuring-instruments": "/category-icons/measuring-instruments-red.png",
  "agri-tools": "/category-icons/agri-tools.png",
};

function getCategoryIcon(slug: string | null) {
  if (!slug) return null;
  return categoryIcons[slug.trim().toLowerCase()] ?? null;
}

export default async function CategoriesPage() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  const allCategories = [...(categories ?? [])];
  for (const category of localCategories) {
    if (!allCategories.some((item) => item.slug?.trim() === category.slug)) {
      allCategories.push({ id: `local-${category.slug}`, ...category });
    }
  }
  if (!allCategories.some((category) => category.slug?.trim() === "pneumatic-brass-fittings")) {
    allCategories.push({ id: "local-pneumatic-brass-fittings", name: "Pneumatic & Brass Fittings", slug: "pneumatic-brass-fittings" });
  }
  if (!allCategories.some((category) => category.slug?.trim() === "measuring-instruments")) {
    allCategories.push({ id: "local-measuring-instruments", name: "Measuring Instruments", slug: "measuring-instruments" });
  }
  if (!allCategories.some((category) => category.slug?.trim() === "agri-tools")) {
    allCategories.push({ id: "local-agri-tools", name: "Agri Tools", slug: "agri-tools" });
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
        {allCategories.map((category) => {
          const icon = getCategoryIcon(category.slug);
          const slug = category.slug.trim();

          return (
            <Link
              key={category.id}
              href={`/categories/${slug}`}
              className="group block h-full"
            >
              <div className="flex h-full min-h-24 items-center rounded-[22px] border border-gray-200 bg-white px-7 py-5 shadow-[0_2px_6px_rgba(15,23,42,0.08)] transition-colors duration-200 hover:border-red-200">
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    {icon && (
                      <Image
                        src={icon}
                        alt=""
                        width={56}
                        height={56}
                        sizes="56px"
                        className="h-14 w-14 shrink-0 object-contain transition duration-300 group-hover:scale-105"
                      />
                    )}
                    <h2 className="min-w-0 break-words text-[13px] font-bold leading-tight text-black transition group-hover:text-red-700 min-[390px]:text-[14px] sm:text-[17px]">
                      {category.name}
                    </h2>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-red-700 transition group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
