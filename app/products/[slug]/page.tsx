"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function ProductPage() {

  const params = useParams();

  const slug = params.slug as string;

  const [product, setProduct] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchProduct() {

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.log(error);
      } else {
        setProduct(data);
      }

      setLoading(false);
    }

    fetchProduct();

  }, [slug]);

  if (loading) {

    return (

      <div className="max-w-7xl mx-auto px-6 py-16">
        Loading...
      </div>

    );
  }

  if (!product) {

    return (

      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-3xl font-bold text-red-700">
          Product Not Found
        </h1>

      </div>

    );
  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="grid md:grid-cols-2 gap-12 items-start">

        <div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-2xl border"
          />

        </div>

        <div>

          <p className="text-red-700 font-semibold uppercase tracking-wider mb-3">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-500 mb-6">
            Product Code: {product.code}
          </p>

          <div className="border-t pt-6">

            <h2 className="text-xl font-semibold mb-3">
              Description
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}