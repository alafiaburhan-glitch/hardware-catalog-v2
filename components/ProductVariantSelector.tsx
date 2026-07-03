"use client";

import { useState } from "react";

interface ProductVariantSelectorProps {
  sizes: string[];
  options: string[];
  productName: string;
  productCode: string;
}

export default function ProductVariantSelector({
  sizes,
  options,
  productName,
  productCode,
}: ProductVariantSelectorProps) {

  const [selectedSize, setSelectedSize] =
    useState<string | null>(null);

  const [selectedOption, setSelectedOption] =
    useState<string | null>(null);

  return (
    <div className="mb-8">

      {/* SIZE */}

      <p className="text-sm text-gray-500 mb-3 font-medium">
        Available Sizes

        {selectedSize && (
          <span className="text-red-700 font-semibold">
            {" "} - {selectedSize} selected
          </span>
        )}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">

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

      {/* OPTIONS */}

      <p className="text-sm text-gray-500 mb-3 font-medium">
        Available Options

        {selectedOption && (
          <span className="text-red-700 font-semibold">
            {" "} - {selectedOption} selected
          </span>
        )}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">

        {options.map((option) => (

          <button
            key={option}
            onClick={() =>
              setSelectedOption(
                selectedOption === option
                  ? null
                  : option
              )
            }
            className={
              selectedOption === option
                ? "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-red-700 bg-red-700 text-white"
                : "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            }
          >
            {option}
          </button>

        ))}

      </div>

      {/* SINGLE BUTTON */}

      {selectedSize && selectedOption && (

        <a
          href={`https://wa.me/919626652275?text=Hi, I am interested in ${productName} (Code: ${productCode}) - Size: ${selectedSize}, Option: ${selectedOption}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-2xl"
        >
          WhatsApp for Quote
        </a>

      )}

    </div>
  );
}