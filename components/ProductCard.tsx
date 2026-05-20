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

      <div className="bg-white rounded-3xl border overflow-hidden hover:shadow-2xl transition duration-300">

        {/* IMAGE */}

        <div className="h-64 bg-gray-100 overflow-hidden">

          {image ? (

            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

          ) : (

            <div className="w-full h-full flex items-center justify-center text-gray-400">

              No Image

            </div>

          )}

        </div>

        {/* CONTENT */}

        <div className="p-6">

          <p className="text-sm text-red-700 font-semibold mb-2 uppercase tracking-widest">

            {code}

          </p>

          <h2 className="text-2xl font-bold text-black group-hover:text-red-700 transition">

            {name}

          </h2>

        </div>

      </div>

    </Link>
  );
}