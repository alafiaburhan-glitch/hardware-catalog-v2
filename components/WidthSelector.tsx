"use client";

import { useState } from "react";

interface WidthSelectorProps {
widths: string[];
productName: string;
productCode: string;
}

export default function WidthSelector({
widths,
productName,
productCode,
}: WidthSelectorProps) {
const [selectedWidth, setSelectedWidth] = useState<string | null>(null);

return ( <div className="mb-8">

  <p className="text-sm text-gray-500 mb-3 font-medium">
    Available Widths

    {selectedWidth && (
      <span className="text-red-700 font-semibold">
        {" "} - {selectedWidth} selected
      </span>
    )}
  </p>

  <div className="flex flex-wrap gap-2">

    {widths.map((width) => (

      <button
        key={width}
        type="button"
        onClick={() =>
          setSelectedWidth(
            selectedWidth === width ? null : width
          )
        }
        className={
          selectedWidth === width
            ? "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-red-700 bg-red-700 text-white"
            : "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
        }
      >
        {width}
      </button>

    ))}

  </div>

  {selectedWidth && (

    <div className="mt-4">

      <a
        href={`https://wa.me/919626652275?text=Hi, I am interested in ${productName} (Code: ${productCode}) - Width: ${selectedWidth}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-2xl"
      >
        WhatsApp for Quote - {selectedWidth}
      </a>

    </div>

  )}

</div>


);
}
