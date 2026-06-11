"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  code: string;
  image?: string;
  slug?: string;
  category?: string;
};

type Category = {
  name: string;
  slug: string;
};

type Props = {
  products?: Product[];
  categories?: Category[];
  initialQuery?: string;
};

export default function SearchClient({ products = [], categories = [], initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = useMemo(() => {
    return (products ?? []).filter((p) => {
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.code.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase();
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory, products]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
          </svg>
          <input
            type="text"
            placeholder="Search by product name or code..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-800 placeholder-gray-400"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="sm:w-56 px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-800"
        >
          <option value="all">All Categories</option>
          {(categories ?? []).map((cat) => (
            <option key={cat.slug} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {filtered.length === (products ?? []).length
          ? `${(products ?? []).length} products`
          : `${filtered.length} of ${(products ?? []).length} products`}
        {selectedCategory !== "all" && (
          <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">{selectedCategory}</span>
        )}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} name={product.name} code={product.code} image={product.image} slug={product.slug} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-xl font-semibold text-gray-700 mb-2">No products found</p>
          <p className="text-gray-500">Try a different search term or category</p>
          <button onClick={() => { setQuery(""); setSelectedCategory("all"); }} className="mt-6 bg-red-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-red-800 transition">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}