"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

export default function CategoryPage() {

  const params = useParams();

  const slug = params.slug as string;

  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchProducts() {

    const { data, error } = await supabase
  .from("products")
  .select("*")
  .eq("category", slug);

      if (error) {
        console.log(error);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    fetchProducts();

  }, [slug]);

  return (

    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="mb-10">

        <h1 className="text-4xl font-bold capitalize text-red-700">
          {slug}
        </h1>

        <p className="text-gray-600 mt-2">
          Browse products under this category
        </p>

      </div>

      {loading ? (

        <p>Loading products...</p>

      ) : products.length === 0 ? (

        <p>No products found.</p>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              name={product.name}
              code={product.code}
              slug={product.slug}
              image={product.image}
            />

          ))}

        </div>

      )}

    </div>
  );
}