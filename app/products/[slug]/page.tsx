import { supabase } from "@/lib/supabase";
import GritSelector from "@/components/GritSelector";
import WidthSelector from "@/components/WidthSelector";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import ProductImageLightbox from "@/components/ProductImageLightbox";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import MaterialSelector from "@/components/MaterialSelector";
import DensitySelector from "@/components/DensitySelector";
import SizeSelector from "@/components/SizeSelector";
import OptionSelector from "@/components/OptionsSelector";
import ProductVariantSelector from "@/components/ProductVariantSelector";
import UniversalSelector from "@/components/UniversalSelector";
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
      
      const availableWidthKey = Object.keys(product.specifications ?? {}).find(
    (k) => k.toLowerCase() === "available width"
  );

      const availableWidths =
      availableWidthKey &&
  product.specifications?.[availableWidthKey]
    ? String(
        product.specifications[availableWidthKey]
      )
        .split(",")
        .map((w: string) => w.trim())
        .filter(Boolean)
    : [];

    const availableMaterials =
  product.specifications?.["Available Material"]
    ? String(
        product.specifications["Available Material"]
      )
        .split(",")
        .map((m: string) => m.trim())
        .filter(Boolean)
    : [];

    const availableDensities =
  product.specifications?.["Available Density"]
    ? String(
        product.specifications["Available Density"]
      )
        .split(",")
        .map((d: string) => d.trim())
        .filter(Boolean)
    : [];

    const availableSizes =
  product.specifications?.["Available Size"]
    ? String(
        product.specifications["Available Size"]
      )
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];

    const availableOptions =
  product.specifications?.["Available Options"]
    ? String(product.specifications["Available Options"])
        .split(",")
        .map((x: string) => x.trim())
        .filter(Boolean)
    : [];

    const variants = [];

if (availableWidths.length > 0)
  variants.push({
    title: "Width",
    values: availableWidths,
  });

if (availableSizes.length > 0)
  variants.push({
    title: "Size",
    values: availableSizes,
  });

if (availableMaterials.length > 0)
  variants.push({
    title: "Material",
    values: availableMaterials,
  });

if (availableDensities.length > 0)
  variants.push({
    title: "Density",
    values: availableDensities,
  });

if (availableOptions.length > 0)
  variants.push({
    title: "Option",
    values: availableOptions,
  });

      console.log("AVAILABLE OPTIONS:", availableOptions);

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

      <div className="grid md:grid-cols-2 gap-12">

        {/* IMAGE — with lightbox if image exists, plain div if not */}
        {product.image ? (
          <ProductImageLightbox src={product.image} alt={product.name} />
        ) : (
          <div className="border rounded-3xl overflow-hidden bg-white sticky top-24 self-start">
            <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
              No Image
            </div>
          </div>
        )}

        {/* DETAILS */}
        <div>
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

          {availableGrits.length > 0 ? (

  <GritSelector
    grits={availableGrits}
    productName={product.name}
    productCode={product.code}
  />

) : variants.length > 0 ? (

  <UniversalSelector
    productName={product.name}
    productCode={product.code}
    variants={variants}
  />

) : (

  <WhatsAppButton
    productName={product.name}
    productCode={product.code}
  />

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
              className="inline-block bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 mb-8 transition"
            >
              Download Datasheet
            </a>
          )}

          {/* SPECIFICATIONS */} 
          {product.specifications && 
          ( <div className="border rounded-3xl overflow-hidden mb-8"> 
          <div className="bg-red-700 text-white px-6 py-4"> 
            <h2 className="text-2xl font-bold">Specifications</h2> 
            </div>
             <div className="divide-y"> 
              {Object.entries(product.specifications)
               .filter(([key]) => key.toLowerCase() !== "available grit" &&
                key.toLowerCase() !== "available width" &&
                key.toLowerCase() !== "available material" &&
                key.toLowerCase() !=="available density" &&
                key.toLowerCase() !=="available size" &&
                key.toLowerCase() !=="available options")
                .map(([key, value]) => ( 
                <div key={key} className="grid grid-cols-2 px-6 py-4"> 
                <div className="font-semibold text-gray-700 capitalize"
                >{key}</div> <div className="text-gray-600">{String(value)}
                </div>
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
        </div>
      </div>

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