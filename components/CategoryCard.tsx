import Link from "next/link";

type CategoryCardProps = {
  name: string;
  slug: string;
  image?: string;
};

export default function CategoryCard({
  name,
  slug,
  image,
}: CategoryCardProps) {

  return (
    <Link href={`/categories/${slug}`}>
      <div className="border-2 border-red-700 rounded-2xl overflow-hidden hover:shadow-xl transition bg-white cursor-pointer">

        {image && (
          <div className="h-40 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900">
            {name}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            View Products
          </p>
        </div>

      </div>
    </Link>
  );
}