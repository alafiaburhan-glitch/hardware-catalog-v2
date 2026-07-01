"use client";

import Counter from "@/components/Counter";

const stats = [
  { value: 1000, label: "Products Delivered" },
  { value: 500, label: "Trusted Clients" },
  { value: 7, label: "Years Experience" },
];

export default function TrustStats() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-6 sm:p-8">
      <div className="grid grid-cols-2 gap-5 sm:gap-6">
        {stats.map(({ value, label }) => (
          <div key={label}>
            <div className="flex items-baseline">
              <Counter
                value={value}
                places={value >= 1000 ? [1000, 100, 10, 1] : value >= 100 ? [100, 10, 1] : [10, 1]}
                fontSize={28}
                padding={2}
                gap={1}
                textColor="#b91c1c"
                fontWeight={800}
              />
              <span className="text-2xl sm:text-3xl font-extrabold text-red-700">+</span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mt-1">{label}</p>
          </div>
        ))}
        {/* 24/7 stays static text — not a countable number */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-red-700 mb-1">24/7</h3>
          <p className="text-gray-600 text-sm sm:text-base">Customer Support</p>
        </div>
      </div>
    </div>
  );
}