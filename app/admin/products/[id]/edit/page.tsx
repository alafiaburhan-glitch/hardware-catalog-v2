"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import categories from "@/data/categories";

type Product = {
  id: number;
  name: string;
  code: string;
  slug: string;
  category: string;
  description: string;
};

export default function EditProductPage() {

  const router = useRouter();

  const params = useParams();

  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    code: "",
    slug: "",
    category: "",
    description: "",
  });

  useEffect(() => {

    const storedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const product = storedProducts.find(
      (item: Product) =>
        item.id === Number(params.id)
    );

    if (product) {
      setFormData(product);
    }

  }, [params.id]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    const storedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const updatedProducts = storedProducts.map(
      (product: Product) => {

        if (product.id === formData.id) {
          return formData;
        }

        return product;

      }
    );

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    alert("Product Updated Successfully!");

    router.push("/admin/products");

  };

  return (

    <div className="max-w-4xl">

      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-3">
          Edit Product
        </h1>

        <p className="text-gray-600">
          Update product information.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* PRODUCT NAME */}

        <div>

          <label className="block mb-2 text-sm font-medium">
            Product Name
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border rounded-2xl px-5 py-4"
          />

        </div>

        {/* PRODUCT CODE */}

        <div>

          <label className="block mb-2 text-sm font-medium">
            Product Code
          </label>

          <input
            type="text"
            value={formData.code}
            onChange={(e) =>
              setFormData({
                ...formData,
                code: e.target.value,
              })
            }
            className="w-full border rounded-2xl px-5 py-4"
          />

        </div>

        {/* PRODUCT SLUG */}

        <div>

          <label className="block mb-2 text-sm font-medium">
            Product Slug
          </label>

          <input
            type="text"
            value={formData.slug}
            onChange={(e) =>
              setFormData({
                ...formData,
                slug: e.target.value,
              })
            }
            className="w-full border rounded-2xl px-5 py-4"
          />

        </div>

        {/* CATEGORY */}

        <div>

          <label className="block mb-2 text-sm font-medium">
            Category
          </label>

          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
            className="w-full border rounded-2xl px-5 py-4"
          >

            {categories.map((category) => (

              <option
                key={category.slug}
                value={category.slug}
              >

                {category.name}

              </option>

            ))}

          </select>

        </div>

        {/* DESCRIPTION */}

        <div>

          <label className="block mb-2 text-sm font-medium">
            Description
          </label>

          <textarea
            rows={6}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full border rounded-2xl px-5 py-4"
          />

        </div>

        {/* UPDATE BUTTON */}

        <button
          type="submit"
          className="bg-black text-white px-8 py-4 rounded-2xl"
        >

          Update Product

        </button>

      </form>

    </div>
  );
}