import Link from "next/link";
import categories from "@/data/categories";

export default function CategoriesPage() {

  return (

    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="mb-12">

        <h1 className="text-4xl font-bold text-red-700 mb-3">
          All Categories
        </h1>

        <p className="text-gray-600">
          Browse all available product categories
        </p>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {categories.map((category) => (

          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
          >

            <div className="border-2 border-red-700 rounded-2xl p-6 hover:bg-red-700 hover:text-white transition cursor-pointer">

              <h2 className="text-lg font-semibold">
                {category.name}
              </h2>

            </div>

          </Link>

        ))}

      </div>

    </div>

  );
}