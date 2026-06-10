import { supabase } from "@/lib/supabase";
import Image from "next/image";
import GritSelector from "@/components/GritSelector";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !product) {
    return (
      <div className="p-10">
        Product not found
      </div>
    );
  }

  // Parse Available Grit from specifications if it exists
  // Case-insensitive lookup for "Available Grit" key
const availableGritKey = Object.keys(product.specifications ?? {}).find(
  (k) => k.toLowerCase() === "available grit"
);

const availableGrits: string[] =
  availableGritKey && product.specifications?.[availableGritKey]
    ? String(product.specifications[availableGritKey])
        .split(",")
        .map((g: string) => g.trim())
        .filter(Boolean)
    : [];
    console.log("SPECS KEYS GALAXY:", JSON.stringify(product.specifications));

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <div className="grid md:grid-cols-2 gap-12">

        {/* IMAGE */}
        <div className="border rounded-3xl overflow-hidden bg-white">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div>

          <p className="text-red-700 font-semibold uppercase tracking-[0.2em] mb-3">
            Product Details
          </p>

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <div className="mb-6">
            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
              Code: {product.code}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg mb-8">
            {product.description}
          </p>

          {/* GRIT SELECTOR — shown instead of static WhatsApp button when grits exist */}
          {availableGrits.length > 0 ? (
            <GritSelector
              grits={availableGrits}
              productName={product.name}
              productCode={product.code}
            />
          ) : (
            <a
              href={`https://wa.me/918940453952?text=Hi, I am interested in ${product.name} (Code: ${product.code})`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-4 rounded-2xl mb-10"
            >
              WhatsApp for Quote
            </a>
          )}

          {/* QUICK INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {product.material && (
              <div className="border rounded-2xl p-4">
                <p className="text-sm text-gray-500">Material</p>
                <p className="font-semibold">{product.material}</p>
              </div>
            )}
            {product.size && (
              <div className="border rounded-2xl p-4">
                <p className="text-sm text-gray-500">Size</p>
                <p className="font-semibold">{product.size}</p>
              </div>
            )}
            {product.weight && (
              <div className="border rounded-2xl p-4">
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-semibold">{product.weight}</p>
              </div>
            )}
          </div>

          {/* DATASHEET */}
          {product.datasheet_url && (
            <a
              href={product.datasheet_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 mb-8"
            >
              Download Datasheet
            </a>
          )}

          {/* SPECIFICATIONS — hide "Available Grit" row since we show it as tabs above */}
          {product.specifications && (
            <div className="border rounded-3xl overflow-hidden mb-8">
              <div className="bg-red-700 text-white px-6 py-4">
                <h2 className="text-2xl font-bold">Specifications</h2>
              </div>
              <div className="divide-y">
                {Object.entries(product.specifications)
                  .filter(([key]) => key !== "Available Grit")
                  .map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 px-6 py-4">
                      <div className="font-semibold text-gray-700 capitalize">
                        {key}
                      </div>
                      <div className="text-gray-600">{String(value)}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          

          {/* BOX CONTENTS */}
          {product.box_contents && (
            <div className="border rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4">What's In The Box</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {product.box_contents}
              </p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}