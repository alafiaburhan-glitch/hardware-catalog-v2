"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import AddToQuoteButton from "@/components/AddToQuoteButton";

interface UniversalSelectorProps {
  productName: string;
  productCode: string;
  productSlug: string;
  productImage?: string | null;
  variants: {
    title: string;
    values: string[];
  }[];
  onSelectionChange?: (selected: Record<string, string>) => void;
  sizeDetails?: Record<string, {
    metresPerKg: number;
    coil220Kg?: number;
    coil40Kg?: number;
  }>;
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
  productSlug,
  productImage,
  variants,
  onSelectionChange,
  sizeDetails,
}: UniversalSelectorProps) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const allSelected = variants.every((v) => selected[v.title]);
  const selectedSizeDetail = selected["Size"] ? sizeDetails?.[selected["Size"]] : undefined;

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
  }, [hasCapacityAndLength, onSelectionChange, selected]);

  function buildWhatsAppMessage() {
    const lines = variants
      .filter((variant) => selected[variant.title])
      .map((variant) => `${variant.title}: ${selected[variant.title]}`);
    return (
      `Hi, I am interested in ${productName} (Code: ${productCode})\n\n` +
      (lines.length > 0 ? `${lines.join("\n")}\n` : "") +
      `Quantity: ${quantity}\nPlease help me confirm the correct specification, availability and price.`
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

      {selectedSizeDetail && (
        <div className="rounded-2xl border border-red-100 bg-red-50/60 p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">
            {selected["Size"]} rope details
          </p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <dt className="text-xs font-medium text-gray-500">Metres per kilogram</dt>
              <dd className="mt-1 text-lg font-bold text-gray-900">{selectedSizeDetail.metresPerKg} m/kg</dd>
            </div>
            {selectedSizeDetail.coil220Kg !== undefined && (
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <dt className="text-xs font-medium text-gray-500">Approx. 220 m coil</dt>
                <dd className="mt-1 text-lg font-bold text-gray-900">{selectedSizeDetail.coil220Kg} kg</dd>
              </div>
            )}
            {selectedSizeDetail.coil40Kg !== undefined && (
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <dt className="text-xs font-medium text-gray-500">Approx. 40 m coil</dt>
                <dd className="mt-1 text-lg font-bold text-gray-900">{selectedSizeDetail.coil40Kg} kg</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-900">Request a quotation</p>
            <p className="mt-1 text-sm text-slate-500">Choose the required specifications, then add the quantity.</p>
          </div>
          <div className="inline-flex shrink-0 items-center rounded-xl border border-slate-200 bg-white">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="p-2.5 hover:bg-slate-100" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
            <span className="min-w-9 text-center font-bold" aria-label={`Quantity ${quantity}`}>{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => value + 1)} className="p-2.5 hover:bg-slate-100" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
          </div>
        </div>
        {!allSelected && <p className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">Select {variants.filter((variant) => !selected[variant.title]).map((variant) => variant.title).join(", ")} to add this item to your quote.</p>}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <AddToQuoteButton productName={productName} productCode={productCode} productSlug={productSlug} productImage={productImage} variants={selected} quantity={quantity} disabled={!allSelected} />
          <a
            href={`https://wa.me/919626652275?text=${encodeURIComponent(buildWhatsAppMessage())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 font-semibold text-white hover:bg-green-700"
          >
            <MessageCircle className="h-5 w-5" /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
