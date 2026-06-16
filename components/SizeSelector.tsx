"use client";

import { useState } from "react";

interface SizeSelectorProps {
  sizes: string[];
  productName: string;
  productCode: string;
}

export default function SizeSelector({
  sizes,
  productName,
  productCode,
}: SizeSelectorProps) {

  const [selectedSize, setSelectedSize] =
    useState<string | null>(null);

  return (
    <div className="mb-8">

      <p className="text-sm text-gray-500 mb-3 font-medium">
        Available Sizes

        {selectedSize && (
          <span className="text-red-700 font-semibold">
            {" "}
            - {selectedSize} selected
          </span>
        )}

      </p>

      <div className="flex flex-wrap gap-2">

        {sizes.map((size) => (

          <button
            key={size}
            onClick={() =>
              setSelectedSize(
                selectedSize === size
                  ? null
                  : size
              )
            }
            className={
              selectedSize === size
                ? "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-red-700 bg-red-700 text-white"
                : "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            }
          >
            {size}
          </button>

        ))}

      </div>

      {selectedSize && (

        <div className="mt-4">

          <a
            href={`https://wa.me/918940453952?text=Hi, I am interested in ${productName} (Code: ${productCode}) - Size: ${selectedSize}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-2xl"
          >
            WhatsApp for Quote
          </a>

        </div>

      )}

    </div>
  );
}