"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    slug: "",
    category: "",
    description: "",
    material: "",
    size: "",
    weight: "",
    box_contents: "",
    datasheet_url: "",
  });

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    setCategories(data || []);
  }

    async function loadProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", Number(params.id))
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setFormData({
      name: data.name || "",
      code: data.code || "",
      slug: data.slug || "",
      category: data.category || "",
      description: data.description || "",
      material: data.material || "",
      size: data.size || "",
      weight: data.weight || "",
      box_contents: data.box_contents || "",
      datasheet_url: data.datasheet_url || "",
    });
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase
        .from("products")
        .update({
          name: formData.name,
          code: formData.code,
          slug: formData.slug,
          category: formData.category,
          description: formData.description,
          material: formData.material,
          size: formData.size,
          weight: formData.weight,
          box_contents: formData.box_contents,
          datasheet_url: formData.datasheet_url,
        })
        .eq("id", Number(params.id));

      if (error) {
        console.log(error);
        alert("Update failed");
        return;
      }

      alert("Product updated successfully");

      router.push("/admin/products");

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-2xl p-4"
        />

        <input
          type="text"
          name="code"
          placeholder="Product Code"
          value={formData.code}
          onChange={handleChange}
          className="w-full border rounded-2xl p-4"
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full border rounded-2xl p-4"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-2xl p-4"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.slug}
            >
              {category.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="w-full border rounded-2xl p-4"
        />

        <input
          type="text"
          name="material"
          placeholder="Material"
          value={formData.material}
          onChange={handleChange}
          className="w-full border rounded-2xl p-4"
        />

        <input
          type="text"
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleChange}
          className="w-full border rounded-2xl p-4"
        />

        <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
          className="w-full border rounded-2xl p-4"
        />

        <textarea
          name="box_contents"
          placeholder="What's In The Box"
          value={formData.box_contents}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-2xl p-4"
        />

        <input
          type="text"
          name="datasheet_url"
          placeholder="Datasheet URL"
          value={formData.datasheet_url}
          onChange={handleChange}
          className="w-full border rounded-2xl p-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-8 py-4 rounded-2xl"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>

      </form>

    </div>
  );
}