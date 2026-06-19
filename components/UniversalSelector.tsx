"use client";

import { useState } from "react";

interface UniversalSelectorProps {
  productName: string;
  productCode: string;
  variants: {
    title: string;
    values: string[];
  }[];
}

export default function UniversalSelector({
  productName,
  productCode,
  variants,
}: UniversalSelectorProps) {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const allSelected = variants.every(
    (v) => selected[v.title]
  );

  return (
    <div className="space-y-6 mb-8">

      {variants.map((variant) => (

        <div key={variant.title}>

          <p className="text-sm text-gray-500 mb-3 font-medium">
            {variant.title}

            {selected[variant.title] && (
              <span className="text-red-700 font-semibold">
                {" "}
                - {selected[variant.title]} selected
              </span>
            )}
          </p>

          <div className="flex flex-wrap gap-2">

            {variant.values.map((value) => (

              <button
                key={value}
                onClick={() =>
                  setSelected((prev) => ({
                    ...prev,
                    [variant.title]:
                      prev[variant.title] === value
                        ? ""
                        : value,
                  }))
                }
                className={
                  selected[variant.title] === value
                    ? "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-red-700 bg-red-700 text-white"
                    : "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                }
              >
                {value}
              </button>

            ))}

          </div>

        </div>

      ))}

      {allSelected && (

        <a
          href={`https://wa.me/918940453952?text=${encodeURIComponent(
            `Hi, I am interested in ${productName} (Code: ${productCode})\n\n` +
            variants
              .map(
                (v) =>
                  `${v.title}: ${selected[v.title]}`
              )
              .join("\n")
          )}`}
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