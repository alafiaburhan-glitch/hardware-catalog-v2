"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface SizeImageUploaderProps {
  sizes: string[];
  sizeImages: Record<string, string>;
  onChange: (sizeImages: Record<string, string>) => void;
}

export default function SizeImageUploader({
  sizes,
  sizeImages,
  onChange,
}: SizeImageUploaderProps) {
  const [uploadingSize, setUploadingSize] = useState<string | null>(null);

  async function handleUpload(size: string, file: File) {
    setUploadingSize(size);
    try {
      const fileName = `size-${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (uploadError) {
        toast.error(`Failed to upload image for ${size}`, {
          description: uploadError.message,
        });
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("products").getPublicUrl(fileName);

      onChange({ ...sizeImages, [size]: publicUrl });
      toast.success(`Image uploaded for ${size}`);
    } finally {
      setUploadingSize(null);
    }
  }

  function handleRemove(size: string) {
    const updated = { ...sizeImages };
    delete updated[size];
    onChange(updated);
    toast.success(`Image removed for ${size}`);
  }

  if (sizes.length === 0) return null;

  const completedCount = sizes.filter((s) => sizeImages[s]).length;

  return (
    <div className="border rounded-2xl p-5 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <label className="block font-semibold text-lg">
          Size-Specific Images
        </label>
        <span className="text-sm text-gray-500">
          {completedCount} / {sizes.length} uploaded
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Upload a unique image for each size. Missing size images will fall back to the main product image.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
        {sizes.map((size) => (
          <div
            key={size}
            className="flex items-center gap-3 bg-white border rounded-xl p-3"
          >
            {/* Preview */}
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
              {sizeImages[size] ? (
                <Image
                  src={sizeImages[size]}
                  alt={size}
                  fill
                  sizes="56px"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-300 text-xs">No img</span>
              )}
            </div>

            {/* Size label + upload */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-700 mb-1 truncate">
                {size}
              </p>
              <div className="flex items-center gap-2">
                <label className="text-xs text-red-700 font-semibold cursor-pointer hover:underline">
                  {uploadingSize === size
                    ? "Uploading..."
                    : sizeImages[size]
                    ? "Replace"
                    : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingSize === size}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(size, file);
                    }}
                    className="hidden"
                  />
                </label>
                {sizeImages[size] && (
                  <button
                    type="button"
                    onClick={() => handleRemove(size)}
                    className="text-xs text-gray-400 hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
