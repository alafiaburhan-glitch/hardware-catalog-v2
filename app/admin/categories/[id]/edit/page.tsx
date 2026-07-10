"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Faq {
  question: string;
  answer: string;
}

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadCategory() {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (!isMounted) return;

      if (error) {
        console.log(error);
        toast.error("Failed to load category");
        setFetching(false);
        return;
      }

      setName(data.name || "");
      setSlug(data.slug || "");
      setFaqs(data.faqs && data.faqs.length > 0 ? data.faqs : []);
      setFetching(false);
    }

    loadCategory();

    return () => {
      isMounted = false;
    };
  }, [id]);

  function addFaq() {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  }

  function updateFaq(index: number, field: "question" | "answer", value: string) {
    setFaqs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function removeFaq(index: number) {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Filter out empty FAQ rows before saving
    const cleanedFaqs = faqs.filter((f) => f.question.trim() && f.answer.trim());

    const { error } = await supabase
      .from("categories")
      .update({
        name,
        slug,
        faqs: cleanedFaqs,
      })
      .eq("id", Number(id));

    if (error) {
      console.log(error);
      toast.error("Update failed", { description: error.message });
      setLoading(false);
      return;
    }

    toast.success("Category updated successfully");
    router.push("/admin/categories");
  }

  if (fetching) {
    return <div className="p-10 text-gray-500">Loading category...</div>;
  }

  return (
    <div className="max-w-3xl">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Edit Category</h1>
        <p className="text-gray-600 mt-2">Editing category ID: {id}</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">

        <div>
          <label className="block font-medium mb-2">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* FAQ MANAGER */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <label className="block font-semibold text-lg">
              Category FAQs
            </label>
            <span className="text-sm text-gray-500">{faqs.length} added</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            These appear as an expandable FAQ section at the bottom of this category&apos;s public page.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition text-sm"
                >
                  Remove
                </button>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(index, "question", e.target.value)}
                    placeholder="e.g. What WLL (Working Load Limit) do I need?"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Answer
                  </label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                    rows={3}
                    placeholder="Write a clear, helpful answer..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addFaq}
            className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition"
          >
            + Add FAQ
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Category"}
        </button>

      </form>
    </div>
  );
}
