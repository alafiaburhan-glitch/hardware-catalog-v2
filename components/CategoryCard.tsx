import Link from "next/link";

type CategoryCardProps = {
  name: string;
  description: string;
  slug: string;
};

export default function CategoryCard({
  name,
  description,
  slug,
}: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`}>

      <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300 bg-white cursor-pointer h-full">

        <h3 className="text-2xl font-semibold mb-3">
          {name}
        </h3>

        <p className="text-gray-600">
          {description}
        </p>

      </div>

    </Link>
  );
}