import Link from "next/link";

import categories from "@/data/categories";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO SECTION */}

      <section className="bg-gradient-to-br from-red-700 via-red-800 to-black text-white">

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

          <div className="max-w-3xl">

            <p className="uppercase tracking-[0.3em] text-sm font-semibold mb-5 text-red-200">
              Industrial Hardware Solutions
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Premium Hardware
              <span className="block text-red-300">
                Industrial Supplies
              </span>
            </h1>

            <p className="text-base md:text-lg text-red-100 leading-relaxed mb-8 max-w-2xl">
              Explore our professional range of ropes, tarpaulins,
              lifting slings, industrial safety materials,
              cargo solutions, and hardware products.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                href="/categories"
                className="bg-white text-red-700 px-6 py-3 rounded-xl font-semibold hover:bg-red-100 transition"
              >
                Explore Products
              </Link>

              <Link
                href="/about"
                className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-red-700 transition"
              >
                About Us
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="max-w-7xl mx-auto px-6 py-16">

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
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="border-2 border-red-700 rounded-2xl p-5 hover:bg-red-700 hover:text-white transition-all duration-300 bg-white"
            >

              <h3 className="text-lg font-semibold">
                {category.name}
              </h3>

            </Link>

          ))}

        </div>

      </section>

      {/* TRUST SECTION */}

      <section className="bg-gray-50 border-t border-b">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>

              <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-sm">
                Trusted Across Industries
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                25+
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                Years of delivering trusted industrial hardware,
                lifting solutions, ropes, tarpaulins,
                and safety products across businesses and industries.
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
                    25+
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

      </section>

      {/* ABOUT PREVIEW */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>

            <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-sm">
              About Noor Agencies
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Reliable Industrial Supply Partner
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Noor Agencies has been serving industries with high-quality
              industrial hardware products, ropes, lifting equipment,
              tarpaulins, cargo solutions, and safety materials
              for decades.
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

      </section>

    </main>
  );
}