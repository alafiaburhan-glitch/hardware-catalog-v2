"use client";

import ProductCard from "@/components/ProductCard";
import FaqAccordion from "@/components/FaqAccordion";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  code: string;
  slug: string;
  image?: string;
};

type Faq = {
  question: string;
  answer: string;
};

type Props = {
  slug: string;
  categoryName: string;
  initialProducts: Product[];
  faqs?: Faq[];
};

export default function CategoryPageClient({
  slug,
  categoryName,
  initialProducts,
  faqs = [],
}: Props) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-red-700 transition">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-red-700 transition">Categories</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{categoryName}</span>
      </div>

      <div className="mb-10">
        <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-sm">
          Category
        </p>
        <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
        <p className="text-gray-500">
          {initialProducts.length} product{initialProducts.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {initialProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-xl font-semibold text-gray-700 mb-2">No products yet</p>
          <p className="text-gray-500">Check back soon or browse other categories.</p>
          <Link
            href="/categories"
            className="inline-block mt-6 bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 transition"
          >
            Browse Categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {initialProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              code={product.code}
              slug={product.slug}
              image={product.image}
            />
          ))}
        </div>
      )}

      {/* FAQ ACCORDION — only renders if faqs exist */}
      <FaqAccordion faqs={faqs} categoryName={categoryName} />
    </div>
  );
}