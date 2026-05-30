import { supabase } from "@/lib/supabase";

import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: product, error } =
    await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();
      console.log(product);

  if (error || !product) {
    return (
      <div className="p-10">
        Product not found
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <div className="grid md:grid-cols-2 gap-12">

        {/* PRODUCT IMAGE */}

        <div className="border rounded-3xl overflow-hidden bg-white">

          {product.image ? (

            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-auto object-cover"
            />

          ) : (

            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              No Image
            </div>

          )}

        </div>

        {/* PRODUCT DETAILS */}

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

          <p className="text-gray-600 leading-relaxed text-lg mb-10">
            {product.description}
          </p>

          {/* SPECIFICATIONS */}

          {product.specifications && (

            <div className="border rounded-3xl overflow-hidden">

              <div className="bg-red-700 text-white px-6 py-4">

                <h2 className="text-2xl font-bold">
                  Specifications
                </h2>

              </div>

              <div className="divide-y">

                {Object.entries(
                  product.specifications
                ).map(([key, value]) => (

                  <div
                    key={key}
                    className="grid grid-cols-2 px-6 py-4"
                  >

                    <div className="font-semibold text-gray-700">
                      {key}
                    </div>

                    <div className="text-gray-600">
                      {String(value)}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}