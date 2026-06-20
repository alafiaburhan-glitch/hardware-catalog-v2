"use client";

import { useState, useEffect } from "react";

interface UniversalSelectorProps {
  productName: string;
  productCode: string;
  variants: {
    title: string;
    values: string[];
  }[];
  onSelectionChange?: (selected: Record<string, string>) => void;
}

/**
 * Converts a capacity + length pair into the combined size key
 * used for image lookups, e.g. "4 Ton" + "3 Mtr" -> "4TONX3MTR"
 */
function buildCombinedSizeKey(capacity: string, length: string): string {
  const capNum = capacity.match(/\d+/)?.[0] ?? "";
  const lenNum = length.match(/\d+/)?.[0] ?? "";
  return `${capNum}TONX${lenNum}MTR`;
}

export default function UniversalSelector({
  productName,
  productCode,
  variants,
  onSelectionChange,
}: UniversalSelectorProps) {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const allSelected = variants.every((v) => selected[v.title]);

  const hasCapacityAndLength =
    variants.some((v) => v.title === "Capacity") &&
    variants.some((v) => v.title === "Length");

  // Notify parent whenever selection changes — also derive a combined "Size" key
  // when both Capacity and Length are present, so image-swap logic keeps working.
  useEffect(() => {
    if (!onSelectionChange) return;

    if (hasCapacityAndLength && selected["Capacity"] && selected["Length"]) {
      const combinedSize = buildCombinedSizeKey(selected["Capacity"], selected["Length"]);
      onSelectionChange({ ...selected, Size: combinedSize });
    } else {
      onSelectionChange(selected);
    }
  }, [selected]);

  function buildWhatsAppMessage() {
    const lines = variants.map((v) => `${v.title}: ${selected[v.title]}`);
    return (
      `Hi, I am interested in ${productName} (Code: ${productCode})\n\n` +
      lines.join("\n")
    );
  }

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
                key={`${variant.title}-${value}`}
                type="button"
                onClick={() =>
                  setSelected((prev) => ({
                    ...prev,
                    [variant.title]: prev[variant.title] === value ? "" : value,
                  }))
                }
                className={
                  selected[variant.title] === value
                    ? "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-red-700 bg-red-700 text-white focus:outline-none"
                    : "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus:outline-none"
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
          href={`https://wa.me/918940453952?text=${encodeURIComponent(buildWhatsAppMessage())}`}
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