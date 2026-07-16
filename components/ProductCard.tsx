import Link from "next/link";
import Image from "next/image";
import { getCategoryIcon } from "@/lib/categoryIcons";

type ProductCardProps = {
  name: string;
  code: string;
  image?: string;
  slug?: string;
  category?: string;
};

export default function ProductCard({
  name,
  code,
  image,
  slug,
  category,
}: ProductCardProps) {
  const displayImage = image || getCategoryIcon(category);

  return (
    <Link href={`/products/${slug || ""}`} className="block h-full group">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 520px) 50vw, 100vw"
              className={`h-full w-full transition duration-700 group-hover:scale-105 ${category === "power-tools" ? "object-contain p-3" : image ? "object-cover" : "object-contain p-5"}`}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 px-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Image pending
              </p>
            </div>
          )}

          <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white shadow sm:left-4 sm:top-4">
            <span className="block truncate">{code}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <h2 className="mb-4 line-clamp-2 text-base font-bold leading-snug text-black transition group-hover:text-red-700 sm:text-xl">
            {name}
          </h2>

          <div className="mt-auto flex items-center justify-between gap-3">
            <span className="text-sm text-gray-500">View Details</span>
            <span className="shrink-0 font-bold text-red-700 transition group-hover:translate-x-1">
              &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
