"use client";

import Link from "next/link";

import Navbar from "@/components/Navbar";
import CategoryCard from "@/components/CategoryCard";
import Counter from "@/components/Counter";

import categories from "@/data/categories";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* NAVBAR */}

      <Navbar />

      {/* HERO SECTION */}

      <section className="max-w-7xl mx-auto px-4 pt-6 pb-10">

        <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-[30px] overflow-hidden relative">

          {/* GLOW */}

          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-500/20 blur-3xl rounded-full" />

          <div className="relative z-10 px-7 md:px-12 py-14">

            <p className="text-red-200 uppercase tracking-[0.25em] font-semibold mb-4 text-xs">
              NOOR AGENCIES
            </p>

            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight max-w-3xl">

              Industrial Hardware
              <br />

              <span className="text-red-200">
                Built For Reliability
              </span>

            </h1>

            <p className="text-red-100 text-sm md:text-base mt-5 max-w-2xl leading-relaxed">

              Trusted supplier of ropes,
              tarpaulins, lifting slings,
              shade nets, CRGO lashing belts,
              and industrial hardware solutions.

            </p>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-3 mt-7">

              <Link
                href="/categories"
                className="bg-white text-red-700 px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-100 transition"
              >
                Browse Categories
              </Link>

              <Link
                href="/about"
                className="border border-white text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white hover:text-red-700 transition"
              >
                About Us
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="max-w-7xl mx-auto px-4 pb-10">

        <div className="mb-5">

          <p className="text-red-700 uppercase tracking-[0.2em] font-semibold mb-2 text-[11px]">
            PRODUCT CATEGORIES
          </p>

          <h2 className="text-2xl md:text-3xl font-black text-black">
            Explore Products
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {categories.map((category) => (

            <CategoryCard
              key={category.slug}
              name={category.name}
              slug={category.slug}
        
            />

          ))}

        </div>

      </section>

      {/* COUNTER SECTION */}

<section className="max-w-7xl mx-auto px-4 pb-14">

  <div className="relative overflow-hidden bg-black rounded-[22px] px-6 py-7 md:px-10 md:py-8">

    <div className="absolute right-0 top-0 w-52 h-52 bg-red-600/20 blur-3xl rounded-full" />

    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">

      <div>

        <p className="text-red-500 uppercase tracking-[0.2em] font-semibold mb-2 text-[11px]">
          EXPERIENCE
        </p>

        <h2 className="text-white text-2xl md:text-3xl font-black leading-tight">
          Trusted Across Industries
        </h2>

      </div>

      <div className="flex flex-col items-center">

        <Counter
          value={25}
          places={[10, 1]}
          fontSize={42}
          padding={2}
          gap={2}
          textColor="white"
          fontWeight={900}
          gradientHeight={16}
          gradientFrom="#000"
          gradientTo="transparent"
          counterStyle={{
            background: "#991b1b",
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "14px",
          }}
          digitStyle={{
            background: "#7f1d1d",
            borderRadius: "8px",
          }}
        />

        <p className="text-gray-300 text-xs mt-2 font-medium">
          YEARS IN BUSINESS
        </p>

      </div>

    </div>

  </div>

</section>

    </main>
  );
}