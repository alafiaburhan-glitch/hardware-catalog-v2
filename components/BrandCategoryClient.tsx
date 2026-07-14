"use client";

import Image from "next/image";
import Link from "next/link";
import type { CategoryBrand } from "@/lib/categoryBrandGroups";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  code: string;
  slug: string;
  image?: string;
};

type Props = {
  categoryName: string;
  categorySlug: string;
  seoDescription?: string;
  brands: Array<CategoryBrand & { productCount: number }>;
  directProducts?: Product[];
};

export default function BrandCategoryClient({
  categoryName,
  categorySlug,
  seoDescription,
  brands,
  directProducts = [],
}: Props) {
  const isProductGrouping = categorySlug === "hand-tools";
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-gray-400 mb-8 pb-1">
        <Link href="/" className="hover:text-red-700 transition">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-red-700 transition">Categories</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{categoryName}</span>
      </div>

      <div className="mb-8 sm:mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.36em] text-red-700 sm:text-sm">
          {isProductGrouping ? "Browse Tool Groups" : "Browse Brands"}
        </p>
        <h1 className="text-3xl font-bold text-black sm:text-4xl">{categoryName}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          {isProductGrouping
            ? "Select a tool group to view its available products, types and varieties."
            : "Select a brand to view available products and varieties."}
        </p>
        {seoDescription && (
          <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
            {seoDescription}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/categories/${categorySlug}/${brand.slug}`}
            className="group block h-full"
          >
            <div className="h-full overflow-hidden rounded-[22px] border border-gray-200 bg-white shadow-[0_2px_6px_rgba(15,23,42,0.08)] transition-colors duration-200 hover:border-red-200">
              {brand.image && (
                <div className="relative aspect-[4/3] border-b border-gray-100 bg-white p-4">
                  <Image
                    src={brand.image}
                    alt={`${brand.name} products`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 560px) 50vw, 100vw"
                    className="object-contain p-3 transition duration-300 group-hover:scale-[1.02]"
                    priority={brand.slug === "loctite"}
                  />
                </div>
              )}

              <div className="flex min-h-24 items-center px-7 py-5">
                <div className="flex w-full items-center justify-between gap-4">
                  <div>
                    <h2 className="text-[16px] font-bold leading-snug text-black transition group-hover:text-red-700 sm:text-[17px]">
                      {brand.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                      {brand.productCount} product{brand.productCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-red-700 transition group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {directProducts.length > 0 && (
        <section className="mt-14 border-t border-gray-200 pt-10">
          <h2 className="mb-6 text-2xl font-bold text-black">Hand Tools</h2>
          <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
            {directProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                code={product.code}
                slug={product.slug}
                image={product.image}
                category={categorySlug}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
