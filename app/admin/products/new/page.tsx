"use client";

import { useState } from "react";
import categories from "@/data/categories";

export default function NewProductPage() {

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    slug: "",
    category: "",
    description: "",
  });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    const newProduct = {
      id: Date.now(),

      name: formData.name,

      code: formData.code,

      slug: formData.slug,

      category: formData.category,

      description: formData.description,

      image: "/products/default.jpg",

      specifications: {
        Material: "Not Added",
        Size: "Not Added",
      },
    };

    // GET EXISTING PRODUCTS

    const existingProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    // ADD NEW PRODUCT

    const updatedProducts = [
      ...existingProducts,
      newProduct,
    ];

    // SAVE BACK TO LOCAL STORAGE

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    alert("Product Saved Successfully!");

    console.log(updatedProducts);

    // RESET FORM

    setFormData({
      name: "",
      code: "",
      slug: "",
      category: "",
      description: "",
    });

  };

  return (

    <div className="max-w-4xl">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-3">
          Add Product
        </h1>

        <p className="text-gray-600">
          Create a new product for the catalog.
        </p>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* PRODUCT NAME */}

        <div>

          <label className="block text-sm font-medium mb-2">
            Product Name
          </label>

          <input
            type="text"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        {/* PRODUCT CODE */}

        <div>

          <label className="block text-sm font-medium mb-2">
            Product Code
          </label>

          <input
            type="text"
            placeholder="HT001"
            value={formData.code}
            onChange={(e) =>
              setFormData({
                ...formData,
                code: e.target.value,
              })
            }
            className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        {/* PRODUCT SLUG */}

        <div>

          <label className="block text-sm font-medium mb-2">
            Product Slug
          </label>

          <input
            type="text"
            placeholder="adjustable-spanner"
            value={formData.slug}
            onChange={(e) =>
              setFormData({
                ...formData,
                slug: e.target.value,
              })
            }
            className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        {/* CATEGORY */}

        <div>

          <label className="block text-sm font-medium mb-2">
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
            className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
          >

            <option value="">
              Select Category
            </option>

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

          <label className="block text-sm font-medium mb-2">
            Description
          </label>

          <textarea
            rows={6}
            placeholder="Enter product description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        {/* SPECIFICATIONS */}

        <div>

          <label className="block text-sm font-medium mb-4">
            Specifications
          </label>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Material"
              className="border rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              placeholder="Chrome Vanadium Steel"
              className="border rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              placeholder="Size"
              className="border rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              placeholder="12 inch"
              className="border rounded-2xl px-5 py-4"
            />

          </div>

        </div>

        {/* SAVE BUTTON */}

        <button
          type="submit"
          className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition"
        >

          Save Product

        </button>

      </form>

    </div>
  );
}