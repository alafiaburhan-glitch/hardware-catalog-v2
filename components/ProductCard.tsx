import Link from "next/link";

type ProductCardProps = {
  name: string;
  code: string;
  image?: string;
  slug?: string;
};

export default function ProductCard({
  name,
  code,
  image,
  slug,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug || ""}`}
      className="block group"
    >
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

        {/* IMAGE */}

        <div className="h-64 bg-gray-100 overflow-hidden relative">

          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <div className="absolute top-4 left-4 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {code}
          </div>

        </div>

        {/* CONTENT */}

        <div className="p-6">

          <h2 className="text-xl font-bold text-black mb-4 group-hover:text-red-700 transition">
            {name}
          </h2>

          <div className="flex items-center justify-between">

            <span className="text-sm text-gray-500">
              View Details
            </span>

            <span className="text-red-700 font-bold group-hover:translate-x-1 transition">
              →
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
}