"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/lib/productSearch";

type Product = {
  id: string;
  name: string;
  code: string;
  image?: string;
  slug?: string;
  category?: string;
  brand?: string;
  description?: string;
  specifications?: Record<string, string>;
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
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [visibleCount, setVisibleCount] = useState(24);
  const availableCategories = useMemo(() => {
    const names = new Map(categories.map((category) => [category.slug, category.name]));
    for (const product of products) {
      if (product.category && !names.has(product.category)) {
        names.set(product.category, product.category.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()));
      }
    }
    return [...names].map(([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name));
  }, [categories, products]);

  const availableBrands = useMemo(() => {
    const brands = new Map<string, string>();
    for (const product of products) {
      const brandValue = product.brand ?? product.specifications?.Brand ?? product.specifications?.brand;
      for (const brand of brandValue?.split(",") ?? []) {
        const cleanBrand = brand.trim();
        if (cleanBrand && cleanBrand.toLowerCase() !== "generic") {
          const normalized = cleanBrand.toLowerCase();
          if (!brands.has(normalized)) brands.set(normalized, cleanBrand);
        }
      }
    }
    return [...brands.values()].sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filtered = useMemo(() => {
    const productsInCategory = (products ?? []).filter((product) => {
      const brandValue = product.brand ?? product.specifications?.Brand ?? product.specifications?.brand ?? "";
      const matchesBrand = selectedBrand === "all" || brandValue.split(",").some((brand) => brand.trim().toLowerCase() === selectedBrand.toLowerCase());
      return (selectedCategory === "all" || product.category?.toLowerCase() === selectedCategory.toLowerCase()) && matchesBrand;
    });

    return searchProducts(productsInCategory, query);
  }, [query, selectedBrand, selectedCategory, products]);

  const visibleProducts = filtered.slice(0, visibleCount);

  return (
    <div>
      <div className="grid gap-3 mb-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_14rem_14rem]">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
          </svg>
          <input
            type="text"
            placeholder="Search by product name or code..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisibleCount(24); }}
            className="w-full pl-12 pr-10 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-800 placeholder-gray-400"
          />
          {query && (
            <button onClick={() => { setQuery(""); setVisibleCount(24); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Clear search">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setVisibleCount(24); }}
          className="px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-800"
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {availableCategories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
        <select value={selectedBrand} onChange={(e) => { setSelectedBrand(e.target.value); setVisibleCount(24); }} className="px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-800" aria-label="Filter by brand">
          <option value="all">All Brands</option>
          {availableBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
        </select>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {filtered.length === (products ?? []).length
          ? `${(products ?? []).length} products`
          : `${filtered.length} of ${(products ?? []).length} products`}
        {selectedCategory !== "all" && (
          <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">{availableCategories.find((category) => category.slug === selectedCategory)?.name ?? selectedCategory}</span>
        )}
        {selectedBrand !== "all" && <span className="ml-2 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold">{selectedBrand}</span>}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((product, index) => (
            <ProductCard key={product.id} name={product.name} code={product.code} image={product.image} slug={product.slug} category={product.category} eager={index < 4} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-xl font-semibold text-gray-700 mb-2">No products found</p>
          <p className="text-gray-500">Try a product type, brand, code, size, or application.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {["Taparia", "Bosch", "lifting", "safety", "cutting"].map((term) => <button key={term} onClick={() => setQuery(term)} className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:border-red-300 hover:text-red-700">{term}</button>)}
          </div>
          <button onClick={() => { setQuery(""); setSelectedCategory("all"); setSelectedBrand("all"); setVisibleCount(24); }} className="mt-6 bg-red-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-red-800 transition">
            Clear filters
          </button>
        </div>
      )}
      {visibleProducts.length < filtered.length && <div className="mt-10 text-center">
        <button onClick={() => setVisibleCount((count) => count + 24)} className="rounded-2xl border-2 border-red-700 px-7 py-3 font-bold text-red-700 transition hover:bg-red-700 hover:text-white">Load 24 more</button>
        <p className="mt-2 text-xs text-slate-500">Showing {visibleProducts.length} of {filtered.length} matching products</p>
      </div>}
    </div>
  );
}
