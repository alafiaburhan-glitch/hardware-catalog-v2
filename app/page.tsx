"use client";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (categoryData) setCategories(categoryData);

      const { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(4);
      if (productData) setProducts(productData);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-black text-white">
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-28">

          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Industrial Hardware Solutions</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Premium Hardware
              <span className="block text-red-300">Industrial Supplies</span>
            </h1>

            <p className="text-lg md:text-xl text-red-100 leading-relaxed mb-10 max-w-2xl">
              Explore our professional range of ropes, tarpaulins, lifting slings,
              industrial safety materials, cargo solutions, and hardware products.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/categories"
                className="bg-white text-red-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Explore Products →
              </Link>
              <Link
                href="/about"
                className="border border-white/60 px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-red-700 transition-all duration-300"
              >
                About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-sm">
              Browse Products
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Product Categories</h2>
          </div>
          <Link href="/categories" className="hidden md:inline-block text-red-700 font-semibold hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.length === 0
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-20 rounded-3xl bg-gray-100 animate-pulse" />
              ))
            : categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug?.trim()}`}
                  className="group bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold group-hover:text-red-700 transition">
                      {category.name}
                    </h3>
                    <span className="text-red-700 text-xl font-bold group-hover:translate-x-1 transition">→</span>
                  </div>
                </Link>
              ))}
        </div>
      </motion.section>

      {/* FEATURED PRODUCTS */}
      {products.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-16"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-sm">
                  Featured Products
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">Popular Products</h2>
              </div>
              <Link href="/categories" className="hidden md:inline-block text-red-700 font-semibold hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  code={product.code}
                  image={product.image}
                  slug={product.slug}
                />
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link href="/categories" className="inline-block bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 transition">
                View All Products
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {/* TRUST SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white border-t border-b"
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-sm">
                Trusted Across Industries
              </p>
              <div className="mb-4">
                <Counter
                  value={25}
                  places={[10, 1]}
                  fontSize={70}
                  padding={5}
                  gap={4}
                  textColor="#b91c1c"
                  fontWeight={800}
                />
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Years of delivering trusted industrial hardware, lifting solutions,
                ropes, tarpaulins, and safety products across industries.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "1000+", label: "Products Delivered" },
                  { value: "500+", label: "Trusted Clients" },
                  { value: "7+", label: "Years Experience" },
                  { value: "24/7", label: "Customer Support" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <h3 className="text-3xl font-bold text-red-700 mb-2">{value}</h3>
                    <p className="text-gray-600">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ABOUT */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-sm">
              About Noor Agencies
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Reliable Industrial Supply Partner
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Noor Agencies has been serving industries with high-quality industrial
              hardware products, ropes, lifting equipment, tarpaulins, cargo solutions,
              and safety materials for decades.
            </p>
            <div className="flex gap-4">
              <Link href="/about" className="inline-block bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 transition">
                Read More
              </Link>
              <Link href="/contact" className="inline-block border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-red-300 hover:text-red-700 transition">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="bg-red-700 rounded-3xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
            <ul className="space-y-4 text-red-100">
              {[
                "Premium Quality Products",
                "Trusted Industry Experience",
                "Competitive Pricing",
                "Reliable Customer Support",
                "Fast Product Availability",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
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
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to place an order?</h2>
            <p className="text-red-200">Get in touch with us directly for bulk pricing and availability.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <a
              href="https://wa.me/918940453952"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            <a
              href="tel:+919894084576"
              className="bg-white text-red-700 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </motion.section>

    </main>
  );
}