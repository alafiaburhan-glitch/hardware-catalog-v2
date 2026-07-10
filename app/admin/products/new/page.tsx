"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SizeImageUploader from "@/components/SizeImageUploader";
import { toast } from "sonner";

type CategoryOption = {
  name: string;
  slug: string;
};

export default function NewProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [sizeImages, setSizeImages] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) {
        console.log(error);
        return;
      }

      setCategories(data || []);
    }

    loadCategories();
  }, []);

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
    specifications: [
      {
        key: "",
        value: "",
      },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const updateSpecification = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updated = [...formData.specifications];
    updated[index][field] = value;
    setFormData({ ...formData, specifications: updated });
  };

  // Detect "Available Sizes" spec to drive the size image uploader
  const availableSizesSpec = formData.specifications.find(
    (s) => ["available size", "available sizes"].includes(s.key.trim().toLowerCase())
  );
  const parsedSizes = availableSizesSpec?.value
    ? availableSizesSpec.value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = "";

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, imageFile);

        if (uploadError) {
          console.log(uploadError);
          toast.error("Image upload failed");
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("products").getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const specificationsObject = Object.fromEntries(
        formData.specifications
          .filter((spec) => spec.key && spec.value)
          .map((spec) => [spec.key, spec.value])
      );

      const { error } = await supabase.from("products").insert([
        {
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
          image: imageUrl,
          specifications: specificationsObject,
          size_images: sizeImages,
        },
      ]);

      if (error) {
        console.log(error);
        toast.error("Failed to add product");
        return;
      }

      toast.success("Product added successfully");
      router.push("/admin/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        <div>
          <label className="block font-semibold mb-3">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold mb-3">Product Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold mb-3">Product Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold mb-3">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-2xl p-4"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-3">Material</label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold mb-3">Size</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold mb-3">Weight</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold mb-3">What&apos;s In The Box</label>
          <textarea
            name="box_contents"
            value={formData.box_contents}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold mb-3">Datasheet URL</label>
          <input
            type="text"
            name="datasheet_url"
            value={formData.datasheet_url}
            onChange={handleChange}
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold mb-3">Product Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            required
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold mb-3">Product Image (Main / Default)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border rounded-2xl p-4"
          />
        </div>

        {/* SPECIFICATIONS */}
        <div className="space-y-5">
          <label className="block font-semibold text-xl">Product Specifications</label>
          <p className="text-sm text-gray-500">
            Tip: add a spec named <strong>&quot;Available Size&quot;</strong> or <strong>&quot;Available Sizes&quot;</strong> with comma-separated
            values (e.g. &quot;25mm, 35mm, 50mm&quot;) to enable size-specific image uploads below.
          </p>

          {formData.specifications.map((spec, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Specification Name"
                value={spec.key}
                onChange={(e) => updateSpecification(index, "key", e.target.value)}
                className="border rounded-2xl p-4"
              />
              <input
                type="text"
                placeholder="Value"
                value={spec.value}
                onChange={(e) => updateSpecification(index, "value", e.target.value)}
                className="border rounded-2xl p-4"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addSpecification}
            className="bg-red-700 text-white px-5 py-3 rounded-xl"
          >
            + Add Specification
          </button>
        </div>

        {/* SIZE IMAGE UPLOADER — appears automatically when sizes detected */}
        <SizeImageUploader
          sizes={parsedSizes}
          sizeImages={sizeImages}
          onChange={setSizeImages}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}
