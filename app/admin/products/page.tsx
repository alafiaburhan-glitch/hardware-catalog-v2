"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
type Product = {
  id: number;
  name: string;
  code: string;
  category: string;
};

export default function AdminProductsPage() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

  async function loadProducts() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data || []);
  }

  loadProducts();

}, []);

const handleDelete = async (id: number) => {

  const confirmed = window.confirm(
    "Delete this product?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  setProducts(
    products.filter(
      (product) => product.id !== id
    )
  );
};

  return (

    <div>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold mb-2">
            Products
          </h1>

          <p className="text-gray-600">
            Manage your catalog products.
          </p>

        </div>

        <Link
          href="/admin/products/new"
          className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition"
        >

          Add Product

        </Link>

      </div>

      {/* PRODUCTS TABLE */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-6 py-4">
                Product
              </th>

              <th className="text-left px-6 py-4">
                Code
              </th>

              <th className="text-left px-6 py-4">
                Category
              </th>

              <th className="text-left px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  {product.name}
                </td>

                <td className="px-6 py-4">
                  {product.code}
                </td>

                <td className="px-6 py-4">
                  {product.category}
                </td>

                <td className="px-6 py-4">

                  <div className="flex gap-3">

                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                    >

                      Edit

                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-xl"
                    >

                      Delete

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}