"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Props {
  id: string;
  name: string;
}

export default function DeleteCategoryButton({ id, name }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete category", {
        description: error.message,
      });
    } else {
      toast.success(`"${name}" deleted successfully`);
      router.refresh();
    }
    setLoading(false);
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sure?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Yes, delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-red-600 hover:underline text-sm"
    >
      Delete
    </button>
  );
}