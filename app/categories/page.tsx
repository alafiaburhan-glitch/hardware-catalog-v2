import Link from "next/link";

import Navbar from "@/components/Navbar";

import categories from "@/data/categories";

export default function CategoriesPage() {

  return (

    <div className="bg-white min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}

        <div className="mb-14">

          <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-4">

            Product Categories

          </p>

          <h1 className="text-5xl font-black text-black mb-6">

            Explore Categories

          </h1>

          <p className="text-gray-600 text-lg max-w-3xl leading-8">

            Browse our industrial hardware catalog by
            category and explore professional products
            designed for commercial and industrial use.

          </p>

        </div>

        {/* CATEGORY GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {categories.map((category) => (

            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group"
            >

              <div className="border rounded-3xl p-7 hover:border-red-700 hover:shadow-xl transition duration-300 bg-white h-full">

                {/* ICON */}

                <div className="w-12 h-12 rounded-2xl bg-red-700/10 flex items-center justify-center mb-6">

                  <div className="w-6 h-6 bg-red-700 rounded-full" />

                </div>

                {/* TITLE */}

                <h2 className="text-2xl font-bold mb-3 group-hover:text-red-700 transition">

                  {category.name}

                </h2>

                {/* DESCRIPTION */}

                <p className="text-gray-600 leading-6 text-sm">

                  Explore professional industrial products
                  and hardware materials in this category.

                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}