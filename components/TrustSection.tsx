"use client";

import Counter from "@/components/Counter";

type TrustStatsProps = {
  productCount: number;
  categoryCount: number;
};

export default function TrustStats({ productCount, categoryCount }: TrustStatsProps) {
  const stats = [
    { value: productCount, label: "Products Available", suffix: "+" },
    { value: categoryCount, label: "Product Categories" },
    { value: 10, label: "Years Experience", suffix: "+" },
  ];
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-6 sm:p-8">
      <div className="grid grid-cols-2 gap-5 sm:gap-6">
        {stats.map(({ value, label, suffix }) => (
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
              {suffix && (
                <span className="text-2xl sm:text-3xl font-extrabold text-red-700">{suffix}</span>
              )}
            </div>
            <p className="text-gray-600 text-sm sm:text-base mt-1">{label}</p>
          </div>
        ))}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-red-700 mb-1">Mon-Sat</h3>
          <p className="text-gray-600 text-sm sm:text-base">Customer Support</p>
        </div>
      </div>
    </div>
  );
}
