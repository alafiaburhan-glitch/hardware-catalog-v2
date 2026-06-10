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

    if (categoryData) {
      setCategories(categoryData);
    }

    const { data: productData } = await supabase
  .from("products")
  .select("*")
  .eq("featured", true)
  .limit(4);

    if (productData) {
      setProducts(productData);
    }
  }

  loadData();
}, []);

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}

<section className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-black text-white">

  <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">

    {/* Background Glow Effects */}

    <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>

    <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>

    {/* Hero Content */}

    <div className="max-w-3xl">

      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 text-sm">

        <span className="w-2 h-2 bg-green-400 rounded-full"></span>

        <span>
          Industrial Hardware Solutions
        </span>

      </div>

      <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">

        Premium Hardware

        <span className="block text-red-300">
          Industrial Supplies
        </span>

      </h1>

      <p className="text-lg md:text-xl text-red-100 leading-relaxed mb-10 max-w-2xl">

        Explore our professional range of ropes,
        tarpaulins, lifting slings, industrial safety materials,
        cargo solutions, and hardware products.

      </p>

      <div className="flex flex-wrap gap-5">

        <Link
          href="/categories"
          className="bg-white text-red-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Explore Products
        </Link>

        <Link
          href="/about"
          className="border border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-red-700 transition-all duration-300"
        >
          About Us
        </Link>

      </div>

    </div>

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

        <div className="mb-10">

          <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-sm">
            Browse Products
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Product Categories
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {categories.map((category) => (

        <Link
  key={category.id}
  href={`/categories/${category.slug?.trim()}`}
  className="group bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
>

  <div className="flex items-center justify-between">

    <h3 className="text-lg font-bold group-hover:text-red-700 transition">
      {category.name}
    </h3>

    <span className="text-red-700 text-xl font-bold group-hover:translate-x-1 transition">
      →
    </span>

  </div>

</Link>

          ))}

        </div>

      </motion.section>
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

        <h2 className="text-3xl md:text-4xl font-bold">
          Popular Products
        </h2>

      </div>

      <Link
        href="/categories"
        className="hidden md:inline-block text-red-700 font-semibold hover:underline"
      >
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

  </div>

</motion.section>

      {/* TRUST SECTION */}

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-50 border-t border-b"
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
                Years of delivering trusted industrial hardware,
                lifting solutions, ropes, tarpaulins,
                and safety products across industries.
              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-sm border p-8">

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <h3 className="text-3xl font-bold text-red-700 mb-2">
                    1000+
                  </h3>

                  <p className="text-gray-600">
                    Products Delivered
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-red-700 mb-2">
                    500+
                  </h3>

                  <p className="text-gray-600">
                    Trusted Clients
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-red-700 mb-2">
                    7+
                  </h3>

                  <p className="text-gray-600">
                    Years Experience
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-red-700 mb-2">
                    24/7
                  </h3>

                  <p className="text-gray-600">
                    Customer Support
                  </p>
                </div>

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
              Noor Agencies has been serving industries
              with high-quality industrial hardware products,
              ropes, lifting equipment, tarpaulins,
              cargo solutions, and safety materials for decades.
            </p>

            <Link
              href="/about"
              className="inline-block bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 transition"
            >
              Read More
            </Link>

          </div>

          <div className="bg-red-700 rounded-3xl p-10 text-white">

            <h3 className="text-2xl font-bold mb-4">
              Why Choose Us?
            </h3>

            <ul className="space-y-4 text-red-100">

              <li>✔ Premium Quality Products</li>
              <li>✔ Trusted Industry Experience</li>
              <li>✔ Competitive Pricing</li>
              <li>✔ Reliable Customer Support</li>
              <li>✔ Fast Product Availability</li>

            </ul>

          </div>

        </div>

      </motion.section>

    </main>
  );
}