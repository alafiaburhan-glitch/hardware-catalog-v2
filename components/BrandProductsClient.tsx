"use client";

import Link from "next/link";
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
  brandName: string;
  products: Product[];
};

export default function BrandProductsClient({ categoryName, categorySlug, brandName, products }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-gray-400 mb-8 pb-1">
        <Link href="/" className="hover:text-red-700 transition">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-red-700 transition">Categories</Link>
        <span>/</span>
        <Link href={`/categories/${categorySlug}`} className="hover:text-red-700 transition">
          {categoryName}
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{brandName}</span>
      </div>

      <div className="mb-8 sm:mb-10">
        <p className="text-red-700 font-semibold uppercase tracking-[0.24em] sm:tracking-[0.3em] mb-3 text-xs sm:text-sm">
          Brand
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{brandName}</h1>
        <p className="text-sm sm:text-base text-gray-500">
          {products.length} product{products.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            code={product.code}
            slug={product.slug}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
