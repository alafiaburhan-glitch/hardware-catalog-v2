"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Ropes", slug: "ropes" },
  { name: "Tarpaulins", slug: "tarpaulins" },
  { name: "Safety", slug: "safety-products" },
  { name: "Power Tools", slug: "power-tools" },
  { name: "Lifting", slug: "lifting-equipment" },
  { name: "Adhesives", slug: "industrial-adhesives" },
];

export default function FloatingCategoryCollage() {
  return (
    <div className="relative w-full h-[560px] hidden lg:block">

      {categories.map((item, index) => {
        const positions = [
          "top-4 left-8",
          "top-24 right-10",
          "top-56 left-20",
          "bottom-10 right-20",
          "bottom-28 left-52",
          "top-1/2 right-44",
        ];

        return (
          <Link
            key={item.slug}
            href={`/categories/${item.slug}`}
            className={`absolute ${positions[index]} group`}
          >
            <div className="w-32 h-32 rotate-45 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">

              <div className="-rotate-45 w-full h-full relative">
                <Image
                  src={`/category-icons/${item.slug}.png`}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

            </div>

            <p className="mt-6 text-center font-semibold text-white">
              {item.name}
            </p>
          </Link>
        );
      })}

    </div>
  );
}