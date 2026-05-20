"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getProducts,
  getStoredProducts,
} from "@/utils/getProducts";

export default function ProductPage() {

  const params = useParams();

  const slug = String(params.slug);

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {

    const allProducts = [
      ...getProducts(),
      ...getStoredProducts(),
    ];

    const foundProduct = allProducts.find(
      (item) =>
        String(item.slug).toLowerCase() ===
        slug.toLowerCase()
    );

    setProduct(foundProduct);

  }, [slug]);

  if (!product) {

    return (

      <div className="max-w-5xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-6">
          Product Not Found
        </h1>

        <p className="text-gray-600">
          This product does not exist.
        </p>

      </div>

    );
  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="grid md:grid-cols-2 gap-16">

        {/* IMAGE */}

        <div className="bg-gray-100 rounded-3xl overflow-hidden">

          {product.image ? (

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

          ) : (

            <div className="h-[500px] flex items-center justify-center text-gray-400">
              No Image
            </div>

          )}

        </div>

        {/* CONTENT */}

        <div>

          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">

            {product.code}

          </p>

          <h1 className="text-5xl font-bold mb-8">

            {product.name}

          </h1>

          <p className="text-gray-600 leading-8 mb-10">

            {product.description}

          </p>

        </div>

      </div>

    </div>
  );
}