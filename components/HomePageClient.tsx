"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import TrustSection from "@/components/TrustSection";
import BrandsMarquee from "@/components/BrandsMarquee";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type CategorySummary = {
  id: number | string;
  name: string;
  slug: string | null;
};

type FeaturedProduct = {
  id: number | string;
  name: string;
  code: string;
  image?: string | null;
  slug?: string | null;
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
};

function getCategoryIcon(slug: string | null) {
  if (!slug) return null;
  return categoryIcons[slug.trim().toLowerCase()] ?? null;
}

export default function HomePageClient() {
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (categoryData) setCategories(categoryData);
      setLoadingCategories(false);

      let { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(8);

      if (!productData || productData.length === 0) {
        const { data: fallback } = await supabase
          .from("products")
          .select("*")
          .limit(8);
        productData = fallback;
      }

      if (productData) setProducts(productData);
      setLoadingProducts(false);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* HERO */}
<section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-black text-white min-h-[72vh] flex items-center">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_45%)]"></div>
  {/* background glow */}
  <div className="absolute inset-0">
    <div className="absolute top-10 left-20 w-96 h-96 bg-red-500/20 blur-[140px] rounded-full" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-black/40 blur-[160px] rounded-full" />
  </div>

  <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">

    <div className="max-w-3xl">

      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-6">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-[2px] bg-red-300"></div>
    <span className="uppercase tracking-[0.35em] text-sm text-red-200 font-semibold">
      INDUSTRIAL SUPPLIER
    </span>
  </div>

  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1] tracking-tight">
    <span className="block text-white">Industrial Hardware</span>
    <span className="block text-red-200">Solutions</span>
  </h1>
</div>

        <p className="mt-8 text-xl text-red-100 max-w-lg leading-relaxed">
          Trusted supplier of industrial hardware, lifting equipment,
          ropes, tarpaulins, safety products, industrial adhesives and
          power tools for businesses across India.
        </p>

       <div className="mt-10">
  <Link
    href="/categories"
    className="inline-flex bg-white text-red-700 px-10 py-5 rounded-2xl font-bold shadow-xl hover:scale-105 transition"
  >
    Explore Products →
  </Link>
</div>
      </motion.div>  

    </div>

  </div>

</section>


      {/* BRANDS MARQUEE */}
      <BrandsMarquee />

      {/* CATEGORIES */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-2 text-xs sm:text-sm">
              Browse Products
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Product Categories</h2>
          </div>
          <Link href="/categories" className="text-red-700 font-semibold hover:underline text-sm shrink-0 ml-4">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {loadingCategories
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-16 sm:h-20 rounded-2xl bg-gray-100 animate-pulse" />
              ))
            : categories.map((category) => {
                const icon = getCategoryIcon(category.slug);

                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug?.trim()}`}
                    className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-2">
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
                        <h3 className="text-sm sm:text-base font-bold group-hover:text-red-700 transition leading-tight">
                          {category.name}
                        </h3>
                      </div>
                      <span className="text-red-700 font-bold group-hover:translate-x-1 transition shrink-0">→</span>
                    </div>
                  </Link>
                );
              })}
        </div>
      </motion.section>

      {/* FEATURED PRODUCTS — carousel */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-50 py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-2 text-xs sm:text-sm">
                Featured Products
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Popular Products</h2>
            </div>
            <Link href="/categories" className="text-red-700 font-semibold hover:underline text-sm shrink-0 ml-4">
              View All →
            </Link>
          </div>

          {loadingProducts ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-none w-[70vw] sm:w-[45vw] md:w-[23%] h-64 rounded-3xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <FeaturedCarousel products={products} />
          ) : null}
        </div>
      </motion.section>

      {/* TRUST SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white border-t border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-xs sm:text-sm">
                Trusted Across Industries
              </p>
              <div className="mb-4 flex items-baseline">
                <Counter
                  value={10}
                  places={[10, 1]}
                  fontSize={60}
                  padding={5}
                  gap={4}
                  textColor="#b91c1c"
                  fontWeight={800}
                />
                <span className="text-5xl sm:text-6xl font-extrabold text-red-700">+</span>
              </div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Years of delivering trusted industrial hardware, lifting solutions,
                ropes, tarpaulins, and safety products across industries.
              </p>
            </div>
            <TrustSection />
          </div>
        </div>
      </motion.section>

      {/* ABOUT */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-xs sm:text-sm">
              About Noor Agencies
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
              Reliable Industrial Supply Partner
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
              Noor Agencies has been serving industries with high-quality industrial
              hardware products, ropes, lifting equipment, tarpaulins, cargo solutions,
              and safety materials for decades.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="inline-block bg-red-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-800 transition text-sm">
                Read More
              </Link>
              <Link href="/contact" className="inline-block border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-semibold hover:border-red-300 hover:text-red-700 transition text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="bg-red-700 rounded-3xl p-7 sm:p-10 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-5">Why Choose Us?</h3>
            <ul className="space-y-3 sm:space-y-4 text-red-100">
              {[
                "Premium Quality Products",
                "Trusted Industry Experience",
                "Competitive Pricing",
                "Reliable Customer Support",
                "Fast Product Availability",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs shrink-0">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* CTA BANNER */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-red-800 to-red-700 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Ready to place an order?</h2>
            <p className="text-red-200 text-sm sm:text-base">Get in touch with us directly for bulk pricing and availability.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://wa.me/919626652275"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="tel:+919626652275"
              className="bg-white text-red-700 px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition text-sm sm:text-base"
            >
              Call Now
            </a>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
