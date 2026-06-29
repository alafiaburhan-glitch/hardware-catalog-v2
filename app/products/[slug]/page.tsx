import { supabase } from "@/lib/supabase";
import GritSelector from "@/components/GritSelector";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import ProductImageLightbox from "@/components/ProductImageLightbox";
import ProductDetailClient from "@/components/ProductDetailClient";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await supabase
    .from("products")
    .select("name, description, image, code, category")
    .eq("slug", slug)
    .single();

  if (!product) return { title: "Product Not Found | Noor Agencies" };

  const title = `${product.name} | Noor Agencies`;
  const description =
    product.description?.slice(0, 160) ??
    `Buy ${product.name} (Code: ${product.code}) from Noor Agencies — trusted industrial hardware supplier.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.image ? [{ url: product.image }] : [],
      url: `https://hardware-catalog-v2.vercel.app/products/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !product) {
    return <div className="p-10 text-gray-500">Product not found</div>;
  }

  const { data: relatedProducts } = await supabase
    .from("products")
    .select("id, name, code, image, slug")
    .eq("category", product.category)
    .neq("slug", slug)
    .limit(4);

  const specs = product.specifications ?? {};

  function findKey(target: string): string | undefined {
    return Object.keys(specs).find((k) => k.toLowerCase() === target.toLowerCase());
  }

  function parseComma(key: string | undefined): string[] {
    if (!key || !specs[key]) return [];
    return String(specs[key]).split(",").map((s: string) => s.trim()).filter(Boolean);
  }

  const availableGrits = parseComma(findKey("available grit"));
  const availableWidths = parseComma(findKey("available width"));
  const availableMaterials = parseComma(findKey("available material"));
  const availableDensities = parseComma(findKey("available density"));
  const availableGsms = parseComma(findKey("available gsm"));
  const sizeKey = findKey("available size") ?? findKey("available sizes");
  const availableSizes = parseComma(sizeKey);
  const availableCapacities = parseComma(findKey("available capacity"));
  const availableLengths = parseComma(findKey("available length"));
  const availableOptions = parseComma(findKey("available options"));

  const variants: { title: string; values: string[] }[] = [];
  if (availableWidths.length > 0) variants.push({ title: "Width", values: availableWidths });
  if (availableCapacities.length > 0 && availableLengths.length > 0) {
    variants.push({ title: "Capacity", values: availableCapacities });
    variants.push({ title: "Length", values: availableLengths });
  } else if (availableSizes.length > 0) {
    variants.push({ title: "Size", values: availableSizes });
  }
  if (availableMaterials.length > 0) variants.push({ title: "Material", values: availableMaterials });
  if (availableDensities.length > 0) variants.push({ title: "Density", values: availableDensities });
  if (availableGsms.length > 0)
  variants.push({
    title: "GSM",
    values: availableGsms,
  });
  if (availableOptions.length > 0) variants.push({ title: "Option", values: availableOptions });

  const hiddenSpecKeys = new Set([
    "available grit",
    "available width",
    "available material",
    "available density",
    "available size",
    "available sizes",
    "available options",
    "available capacity",
    "available length",
    "available gsm"
  ]);

  const hasGrit = availableGrits.length > 0;
  const hasVariants = variants.length > 0;

  const detailsTop = (
    <>
      <p className="text-red-700 font-semibold uppercase tracking-[0.2em] mb-3">
        Product Details
      </p>
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      <div className="mb-6">
        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
          Code: {product.code}
        </span>
      </div>
      <p className="text-gray-600 leading-relaxed text-lg mb-8">{product.description}</p>
    </>
  );

  const detailsBottom = (
    <>
      {/* QUICK INFO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-8">
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
          className="inline-block bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 mb-8 transition"
        >
          Download Datasheet
        </a>
      )}

      {/* SPECIFICATIONS */}
      {product.specifications && (
        <div className="border rounded-3xl overflow-hidden mb-8">
          <div className="bg-red-700 text-white px-6 py-4">
            <h2 className="text-2xl font-bold">Specifications</h2>
          </div>
          <div className="divide-y">
            {Object.entries(product.specifications)
              .filter(([key]) => !hiddenSpecKeys.has(key.toLowerCase()))
              .map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 px-6 py-4">
                  <div className="font-semibold text-gray-700 capitalize">{key}</div>
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
          <p className="text-gray-600 whitespace-pre-line">{product.box_contents}</p>
        </div>
      )}
    </>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
        <Link href="/" className="hover:text-red-700 transition">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-red-700 transition">Categories</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link href={`/categories/${product.category}`} className="hover:text-red-700 transition capitalize">
              {product.category.replace(/-/g, " ")}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-700 font-medium truncate">{product.name}</span>
      </div>

      {hasVariants ? (
        <ProductDetailClient
          productName={product.name}
          productCode={product.code}
          defaultImage={product.image || null}
          sizeImages={product.size_images ?? {}}
          variants={variants}
          detailsTop={detailsTop}
          detailsBottom={detailsBottom}
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-12">
          {product.image ? (
            <ProductImageLightbox src={product.image} alt={product.name} />
          ) : (
            <div className="border rounded-3xl overflow-hidden bg-white sticky top-24 self-start">
              <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            </div>
          )}

          <div>
            {detailsTop}

            {hasGrit ? (
              <GritSelector
                grits={availableGrits}
                productName={product.name}
                productCode={product.code}
              />
            ) : (
              <WhatsAppButton
                productName={product.name}
                productCode={product.code}
              />
            )}

            {detailsBottom}
          </div>
        </div>
      )}

      {/* RELATED PRODUCTS */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-20 border-t pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-2 text-sm">More Like This</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Related Products</h2>
            </div>
            {product.category && (
              <Link href={`/categories/${product.category}`} className="text-red-700 font-semibold hover:underline text-sm shrink-0 ml-4">
                View All →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((related) => (
              <ProductCard
                key={related.id}
                name={related.name}
                code={related.code}
                image={related.image}
                slug={related.slug}
              />
            ))}
          </div>
        </div>
      )}

    </main>
  );
}