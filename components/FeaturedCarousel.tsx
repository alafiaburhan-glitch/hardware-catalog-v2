"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string | number;
  name: string;
  code: string;
  image?: string | null;
  slug?: string | null;
  category?: string | null;
};

type Props = {
  products: Product[];
};

export default function FeaturedCarousel({ products }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
    },
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[23%]"
            >
              <ProductCard
                name={product.name}
                code={product.code}
                image={product.image ?? undefined}
                slug={product.slug ?? undefined}
                category={product.category ?? undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={scrollPrev}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:border-red-300 hover:text-red-700 transition z-10"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:border-red-300 hover:text-red-700 transition z-10"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
