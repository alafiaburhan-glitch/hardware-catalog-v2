"use client";

import { use } from "react";
import { useEffect, useState } from "react";

import productsData from "@/data/products";

import ProductCard from "@/components/ProductCard";

type Product = {
  id: number;
  name: string;
  code: string;
  slug: string;
  category: string;
  description?: string;
  image?: string;
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = use(params);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

    const localProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const allProducts = [
      ...productsData,
      ...localProducts,
    ];

    const filteredProducts = allProducts.filter(
      (product) => product.category === slug
    );

    setProducts(filteredProducts);

  }, [slug]);

  return (

    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* HEADER */}

      <div className="mb-8">

        <p className="text-red-700 uppercase tracking-[0.2em] font-semibold mb-2 text-xs">
          CATEGORY
        </p>

        <h1 className="text-3xl md:text-4xl font-black capitalize">
          {slug}
        </h1>

      </div>

      {/* PRODUCTS */}

      {products.length === 0 ? (

        <div className="border border-red-200 rounded-2xl p-10 text-center">

          <h2 className="text-xl font-bold mb-2">
            No Products Found
          </h2>

          <p className="text-gray-500">
            No products added in this category yet.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              name={product.name}
              code={product.code}
              image={product.image || "/products/default.jpg"}
              slug={product.slug}
            />

          ))}

        </div>

      )}

    </div>
  );
}