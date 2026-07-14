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
  seoDescription?: string;
  faqs?: Faq[];
};

export default function CategoryPageClient({
  slug,
  categoryName,
  initialProducts,
  seoDescription,
  faqs = [],
}: Props) {
  const whatsappText = encodeURIComponent(
    `Hi, I would like to enquire about ${categoryName}. Please share available products, sizes, and pricing.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-gray-400 mb-8 pb-1">
        <Link href="/" className="hover:text-red-700 transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-red-700 transition">
          Categories
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{categoryName}</span>
      </div>

      <div className="mb-8 sm:mb-10">
        <p className="text-red-700 font-semibold uppercase tracking-[0.24em] sm:tracking-[0.3em] mb-3 text-xs sm:text-sm">
          Category
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{categoryName}</h1>
        <p className="text-sm sm:text-base text-gray-500">
          {initialProducts.length} product{initialProducts.length !== 1 ? "s" : ""} available
        </p>
        {seoDescription && (
          <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
            {seoDescription}
          </p>
        )}
      </div>

      {initialProducts.length === 0 ? (
        <div className="rounded-3xl border border-red-100 bg-red-50/50 px-5 py-12 text-center sm:px-8 sm:py-16">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-sm font-bold text-red-700 shadow-sm">
            NA
          </div>
          <p className="text-xl font-semibold text-gray-900 mb-2">
            This category is being updated
          </p>
          <p className="mx-auto max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            We may still be able to arrange {categoryName.toLowerCase()} even if
            they are not listed here yet. Send us a quick enquiry and we will
            confirm availability.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`https://wa.me/919626652275?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600 sm:w-auto"
            >
              Ask on WhatsApp
            </a>
            <Link
              href="/categories"
              className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-red-300 hover:text-red-700 sm:w-auto"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {initialProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              code={product.code}
              slug={product.slug}
              image={product.image}
              category={slug}
            />
          ))}
        </div>
      )}

      <FaqAccordion faqs={faqs} categoryName={categoryName} />
    </div>
  );
}
