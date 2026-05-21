"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import categories from "@/data/categories";
import { supabase } from "@/lib/supabase";

export default function NewProductPage() {

  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    slug: "",
    category: "",
    description: "",
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setLoading(true);

    let imageUrl = "/products/default.jpg";

    // UPLOAD IMAGE

    if (imageFile) {

      const fileExt = imageFile.name.split(".").pop();

      const fileName = `${uuidv4()}.${fileExt}`;

      const filePath = fileName;

      const { error: uploadError } = await supabase
        .storage
        .from("products")
        .upload(filePath, imageFile);

      if (uploadError) {

        console.log(uploadError);

        alert("Image upload failed");

        setLoading(false);

        return;
      }

      const {
        data: { publicUrl },
      } = supabase
        .storage
        .from("products")
        .getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    // SAVE PRODUCT

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name: formData.name,
          code: formData.code,
          slug: formData.slug,
          category: formData.category,
          description: formData.description,
          image: imageUrl,
        },
      ]);

    setLoading(false);

    if (error) {

      console.log(error);

      alert("Error saving product");

      return;
    }

    alert("Product Saved Successfully!");

    setFormData({
      name: "",
      code: "",
      slug: "",
      category: "",
      description: "",
    });

    setImageFile(null);
  };

  return (

    <div className="max-w-4xl">

      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-3 text-red-700">
          Add Product
        </h1>

        <p className="text-gray-600">
          Create a new product for the catalog.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

          <label className="block text-sm font-medium mb-2">
            Product Name
          </label>

          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-2">
            Product Code
          </label>

          <input
            type="text"
            required
            value={formData.code}
            onChange={(e) =>
              setFormData({
                ...formData,
                code: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-2">
            Product Slug
          </label>

          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) =>
              setFormData({
                ...formData,
                slug: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-2">
            Category
          </label>

          <select
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
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

        <div>

          <label className="block text-sm font-medium mb-2">
            Product Description
          </label>

          <textarea
            rows={5}
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-2">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              if (e.target.files?.[0]) {
                setImageFile(e.target.files[0]);
              }

            }}
            className="w-full border rounded-xl px-4 py-3"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-700 text-white px-6 py-3 rounded-xl hover:bg-red-800 transition"
        >

          {loading ? "Saving..." : "Save Product"}

        </button>

      </form>

    </div>
  );
}