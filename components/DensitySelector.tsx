"use client";

import { useState } from "react";

interface DensitySelectorProps {
densities: string[];
productName: string;
productCode: string;
}

export default function DensitySelector({
densities,
productName,
productCode,
}: DensitySelectorProps) {
const [selectedDensity, setSelectedDensity] = useState<string | null>(null);

return ( <div className="mb-8">

  <p className="text-sm text-gray-500 mb-3 font-medium">
    Density

    {selectedDensity && (
      <span className="text-red-700 font-semibold">
        {" "} - {selectedDensity} selected
      </span>
    )}
  </p>

  <div className="flex flex-wrap gap-2">

    {densities.map((density) => (

      <button
        key={density}
        type="button"
        onClick={() =>
          setSelectedDensity(
            selectedDensity === density ? null : density
          )
        }
        className={
          selectedDensity === density
            ? "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-red-700 bg-red-700 text-white"
            : "px-4 py-2 rounded-xl border-2 text-sm font-semibold border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
        }
      >
        {density}
      </button>

    ))}

  </div>

  {selectedDensity && (

    <div className="mt-4">

      <a
        href={`https://wa.me/918940453952?text=Hi, I am interested in ${productName} (Code: ${productCode}) - Density: ${selectedDensity}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-2xl"
      >
        WhatsApp for Quote - {selectedDensity}
      </a>

    </div>

  )}

</div>


);
}
