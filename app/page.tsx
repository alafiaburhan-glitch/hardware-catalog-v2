import Link from "next/link";

import categories from "@/data/categories";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-white">

      {/* HERO SECTION */}

      <section className="bg-gradient-to-br from-red-700 to-red-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="max-w-3xl">

            <p className="uppercase tracking-[0.3em] text-sm font-semibold mb-5 text-red-200">
              Noor Agencies
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Industrial Hardware & Safety Solutions
            </h1>

            <p className="text-lg text-red-100 leading-relaxed max-w-2xl">
              Trusted across industries for ropes, tarpaulins,
              lifting equipment, safety products, cargo solutions,
              and industrial supplies.
            </p>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="mb-10">

          <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-sm">
            Browse Products
          </p>

          <h2 className="text-3xl font-bold">
            Product Categories
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {categories.map((category) => (

            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="border-2 border-red-700 rounded-2xl p-6 hover:bg-red-700 hover:text-white transition-all duration-300"
            >

              <h3 className="text-lg font-semibold">
                {category.name}
              </h3>

            </Link>

          ))}

        </div>

      </section>

      {/* YEARS SECTION */}

      <section className="bg-gray-50 border-t border-b">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-red-700 mb-4">
              25+
            </h2>

            <p className="text-xl font-semibold mb-2">
              Years of Trusted Business
            </p>

            <p className="text-gray-600">
              Serving industries with reliable products and service excellence.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}