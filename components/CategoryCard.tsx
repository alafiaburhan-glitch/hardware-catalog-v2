import Link from "next/link";

type CategoryCardProps = {
  name: string;
  description: string;
  slug: string;
  image?: string;
};

export default function CategoryCard({
  name,
  description,
  slug,
  image,
}: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`}>
      <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300 bg-white cursor-pointer h-full">

        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
        )}

        <h3 className="text-2xl font-semibold mb-3">{name}</h3>

        <p className="text-gray-600">{description}</p>

      </div>
    </Link>
  );
}