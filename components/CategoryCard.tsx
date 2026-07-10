import Link from "next/link";
import Image from "next/image";

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
          <div className="relative h-40 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
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
