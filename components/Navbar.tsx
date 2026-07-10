"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ProductResult = {
  id: string;
  name: string;
  code: string;
  slug: string;
  image?: string;
  category?: string;
};

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("id, name, code, slug, image, category")
        .or(`name.ilike.%${query}%,code.ilike.%${query}%`)
        .limit(6);

      setResults(data ?? []);
      setShowDropdown(true);
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
      setShowDropdown(false);
    }
  }

  function handleClose() {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  }

  function handleResultClick() {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* h-14 on mobile, h-20 on desktop */}
        <div className="h-14 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">

          {/* LOGO */}
          <Link
            href="/"
            className={`flex flex-col shrink-0 focus:outline-none ${searchOpen ? "hidden sm:flex" : "flex"}`}
          >
            <span className="text-xl sm:text-3xl font-black tracking-wide leading-tight">
              <span className="text-black">NOOR</span>
              <span className="text-red-700"> AGENCIES</span>
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 leading-tight">Industrial Hardware Supplier</span>
          </Link>

          {/* SEARCH BAR + DROPDOWN */}
          {searchOpen && (
            <div ref={containerRef} className="flex-1 relative flex items-center gap-2">
              <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => {
                      const nextQuery = e.target.value;
                      setQuery(nextQuery);

                      if (nextQuery.trim().length < 2) {
                        setResults([]);
                        setShowDropdown(false);
                      }
                    }}
                    onFocus={() => results.length > 0 && setShowDropdown(true)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm"
                  />

                  {/* DROPDOWN */}
                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-50">
                      {loading ? (
                        <div className="px-4 py-3 text-sm text-gray-400">Searching...</div>
                      ) : results.length > 0 ? (
                        <>
                          {results.map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.slug}`}
                              onClick={handleResultClick}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition group border-b border-gray-50 last:border-0"
                            >
                              <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                {product.image ? (
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="36px"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">N/A</div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-red-700 transition">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                  {product.code}
                                  {product.category && (
                                    <span className="ml-2 text-gray-300">· {product.category}</span>
                                  )}
                                </p>
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-300 group-hover:text-red-700 transition shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                              </svg>
                            </Link>
                          ))}
                          <button
                            type="submit"
                            className="w-full px-4 py-3 text-sm text-red-700 font-semibold hover:bg-red-50 transition text-left flex items-center justify-between bg-red-50/50"
                          >
                            <span>See all results for &quot;{query}&quot;</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <div className="px-4 py-4 text-sm text-gray-400 text-center">
                          No products found for &quot;{query}&quot;
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Hide Search button on mobile to save space */}
                <button type="submit" className="hidden sm:block bg-red-700 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-red-800 transition text-sm shrink-0">
                  Search
                </button>
              </form>

              <button type="button" onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition p-1 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* NAVIGATION — desktop only */}
          {!searchOpen && (
            <nav className="hidden md:flex items-center gap-8 font-medium">
              <Link href="/" className="hover:text-red-700 transition">Home</Link>
              <Link href="/categories" className="hover:text-red-700 transition">Categories</Link>
              <Link href="/about" className="hover:text-red-700 transition">About</Link>
              <Link href="/contact" className="hover:text-red-700 transition">Contact</Link>
            </nav>
          )}

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!searchOpen && (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-600 hover:text-red-700"
                aria-label="Open search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
                </svg>
              </button>
            )}
            <a
              href="tel:+919626652275"
              className="bg-red-700 text-white px-3 py-2 sm:px-5 sm:py-3 rounded-xl font-semibold hover:bg-red-800 transition text-xs sm:text-base"
            >
              Call Now
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
