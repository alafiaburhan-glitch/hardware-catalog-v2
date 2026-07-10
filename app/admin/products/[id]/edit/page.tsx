"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SizeImageUploader from "@/components/SizeImageUploader";
import { toast } from "sonner";

type CategoryOption = {
  name: string;
  slug: string;
};

type ProductRecord = {
  name?: string | null;
  code?: string | null;
  slug?: string | null;
  category?: string | null;
  description?: string | null;
  material?: string | null;
  size?: string | null;
  weight?: string | null;
  box_contents?: string | null;
  datasheet_url?: string | null;
  image?: string | null;
  specifications?: Record<string, string> | null;
  size_images?: Record<string, string> | null;
};

type SpecificationRow = {
  key: string;
  value: string;
};

type ProductFormData = {
  name: string;
  code: string;
  slug: string;
  category: string;
  description: string;
  material: string;
  size: string;
  weight: string;
  box_contents: string;
  datasheet_url: string;
  image: string;
  specifications: SpecificationRow[];
};

const emptyFormData: ProductFormData = {
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
  image: "",
  specifications: [{ key: "", value: "" }],
};

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [sizeImages, setSizeImages] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ProductFormData>(emptyFormData);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      const [categoryResponse, productResponse] = await Promise.all([
        supabase.from("categories").select("name, slug").order("name"),
        supabase.from("products").select("*").eq("id", id).single(),
      ]);

      if (!isMounted) return;

      if (categoryResponse.error) {
        console.log(categoryResponse.error);
        toast.error("Failed to load categories");
      } else {
        setCategories((categoryResponse.data ?? []) as CategoryOption[]);
      }

      if (productResponse.error || !productResponse.data) {
        console.log(productResponse.error);
        toast.error("Failed to load product");
        setFetching(false);
        return;
      }

      const product = productResponse.data as ProductRecord;
      const specifications = Object.entries(product.specifications ?? {}).map(
        ([key, value]) => ({ key, value: String(value) })
      );

      setFormData({
        name: product.name ?? "",
        code: product.code ?? "",
        slug: product.slug ?? "",
        category: product.category ?? "",
        description: product.description ?? "",
        material: product.material ?? "",
        size: product.size ?? "",
        weight: product.weight ?? "",
        box_contents: product.box_contents ?? "",
        datasheet_url: product.datasheet_url ?? "",
        image: product.image ?? "",
        specifications: specifications.length > 0 ? specifications : [{ key: "", value: "" }],
      });
      setSizeImages(product.size_images ?? {});
      setFetching(false);
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function addSpecification() {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  }

  function updateSpecification(index: number, field: "key" | "value", value: string) {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.map((spec, specIndex) =>
        specIndex === index ? { ...spec, [field]: value } : spec
      ),
    }));
  }

  function removeSpecification(index: number) {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, specIndex) => specIndex !== index),
    }));
  }

  const availableSizesSpec = formData.specifications.find((spec) =>
    ["available size", "available sizes"].includes(spec.key.trim().toLowerCase())
  );
  const parsedSizes = availableSizesSpec?.value
    ? availableSizesSpec.value
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean)
    : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, imageFile);

        if (uploadError) {
          console.log(uploadError);
          toast.error("Image upload failed", { description: uploadError.message });
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("products").getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const specificationsObject = Object.fromEntries(
        formData.specifications
          .filter((spec) => spec.key.trim() && spec.value.trim())
          .map((spec) => [spec.key.trim(), spec.value.trim()])
      );

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
          image: imageUrl,
          specifications: specificationsObject,
          size_images: sizeImages,
        })
        .eq("id", id);

      if (error) {
        console.log(error);
        toast.error("Failed to update product", { description: error.message });
        return;
      }

      toast.success("Product updated successfully");
      router.push("/admin/products");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <div className="p-10 text-gray-500">Loading product...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10">Edit Product</h1>

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
          <label className="block font-semibold mb-3">Product Image</label>
          {formData.image && (
            <a
              href={formData.image}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 inline-block text-sm font-semibold text-red-700 hover:underline"
            >
              View current image
            </a>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <label className="block font-semibold text-xl">Product Specifications</label>
            <button
              type="button"
              onClick={addSpecification}
              className="bg-red-700 text-white px-5 py-3 rounded-xl"
            >
              + Add Specification
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Tip: add a spec named <strong>&quot;Available Size&quot;</strong> or <strong>&quot;Available Sizes&quot;</strong> with comma-separated
            values (e.g. &quot;25mm, 35mm, 50mm&quot;) to enable size-specific image uploads below.
          </p>

          {formData.specifications.map((spec, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4">
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
              <button
                type="button"
                onClick={() => removeSpecification(index)}
                className="border border-gray-200 text-gray-500 px-4 rounded-2xl hover:border-red-200 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <SizeImageUploader
          sizes={parsedSizes}
          sizeImages={sizeImages}
          onChange={setSizeImages}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
