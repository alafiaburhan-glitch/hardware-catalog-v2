import { supabase } from "@/lib/supabase";
import GritSelector from "@/components/GritSelector";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import ProductImageLightbox from "@/components/ProductImageLightbox";
import ProductDetailClient from "@/components/ProductDetailClient";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHandTool, handTools } from "@/data/handTools";
import { getPowerTool, powerTools, type PowerToolModel } from "@/data/powerTools";
import BrandModelSelector from "@/components/BrandModelSelector";
import { getPneumaticBrassFitting, pneumaticBrassFittings } from "@/data/pneumaticBrassFittings";
import { getCategoryIcon } from "@/lib/categoryIcons";
import { getMeasuringInstrument, measuringInstruments } from "@/data/measuringInstruments";
import { getAgriTool, agriTools } from "@/data/agriTools";
import { getPackingMaterial, packingMaterials } from "@/data/packingMaterials";

export const dynamic = "force-dynamic";

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

  const catalogProduct = product ?? getHandTool(slug) ?? getPowerTool(slug) ?? getPneumaticBrassFitting(slug) ?? getMeasuringInstrument(slug) ?? getAgriTool(slug) ?? getPackingMaterial(slug);
  if (!catalogProduct) {
    return {
      title: "Product Not Found | Noor Agencies",
      description: "Product not found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl = `https://www.nooragencies.in/products/${slug}`;
  const title = `${catalogProduct.name} in Coimbatore`;
  const description = `Buy ${catalogProduct.name} in Coimbatore from Noor Agencies. Contact us for availability, bulk enquiries and industrial hardware supply.`;

  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title,
      description,
      images: catalogProduct.image
        ? [
            {
              url: catalogProduct.image,
              width: 1200,
              height: 630,
              alt: catalogProduct.name,
            },
          ]
        : [],
      url: productUrl,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const { data: databaseProduct } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  const catalogProduct = getHandTool(slug) ?? getPowerTool(slug) ?? getPneumaticBrassFitting(slug) ?? getMeasuringInstrument(slug) ?? getAgriTool(slug) ?? getPackingMaterial(slug);
  const product = catalogProduct ?? databaseProduct;
  if (!product) {
    notFound();
  }

  const { data: databaseRelatedProducts } = await supabase
    .from("products")
    .select("id, name, code, image, slug")
    .eq("category", product.category)
    .neq("slug", slug)
    .limit(4);
  const relatedProducts = product.category === "hand-tools"
    ? handTools.filter((item) => item.slug !== slug).slice(0, 4)
    : product.category === "power-tools"
      ? powerTools.filter((item) => item.slug !== slug).slice(0, 4)
      : product.category === "pneumatic-brass-fittings"
        ? pneumaticBrassFittings.filter((item) => item.slug !== slug).slice(0, 4)
        : product.category === "measuring-instruments"
          ? measuringInstruments.filter((item) => item.slug !== slug).slice(0, 4)
        : product.category === "agri-tools"
          ? agriTools.filter((item) => item.slug !== slug && item.specifications["Instrument Group"] === product.specifications["Instrument Group"]).slice(0, 4)
        : product.category === "packaging-material"
          ? packingMaterials.filter((item) => item.slug !== slug).slice(0, 4)
        : databaseRelatedProducts;

  const specs = product.specifications ?? {};
  const catalogModels: PowerToolModel[] = "models" in product && Array.isArray(product.models) ? product.models : [];

  function findKey(target: string): string | undefined {
    return Object.keys(specs).find((k) => k.toLowerCase() === target.toLowerCase());
  }

  function parseComma(key: string | undefined): string[] {
    if (!key || !specs[key]) return [];
    return Array.from(
      new Set(
        String(specs[key])
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      )
    );
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
  const weightKey = findKey("available weight") ?? findKey("available weights");
  const availableWeights = parseComma(weightKey);
  const availableBrands = parseComma(findKey("brand")) || [];

  const variants: { title: string; values: string[] }[] = [];
  if (catalogModels.length === 0 && availableBrands.length > 1) variants.push({ title: "Brand", values: availableBrands });
  if (availableGrits.length > 0) variants.push({ title: "Grit", values: availableGrits });
  if (availableWidths.length > 0) variants.push({ title: "Width", values: availableWidths });
  if (availableWeights.length > 0) variants.push({ title: "Weight", values: availableWeights });
  if (availableCapacities.length > 0 && availableLengths.length > 0) {
    variants.push({ title: "Capacity", values: availableCapacities });
    variants.push({ title: "Length", values: availableLengths });
  } else if (availableSizes.length > 0) {
    variants.push({ title: "Size", values: availableSizes });
  }
  if (availableLengths.length > 0 && availableCapacities.length === 0) {
    variants.push({ title: "Length", values: availableLengths });
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
    "available gsm",
    "brand",
    "available models",
    "available weight",
    "available weights",
    "instrument group",
    "catalog source",
    "catalog page",
    "source file",
    "source sheet",
    "worksheet",
    "workbook",
    "excel workbook",
  ]);

  function isPublicSpecification(key: string) {
    const normalized = key.toLowerCase().trim();
    if (hiddenSpecKeys.has(normalized)) return false;
    return !/(?:excel|workbook|worksheet|source\s*(?:file|sheet)|catalog\s*(?:source|page))/.test(normalized);
  }

  const hasGrit = availableGrits.length > 0;
  const hasVariants = variants.length > 0;
  const categoryIcon = getCategoryIcon(product.category);

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
      <p className="text-gray-600 leading-relaxed mb-8">
        {product.name} is available from Noor Agencies in Coimbatore for
        industrial, workshop, maintenance and bulk supply enquiries. Contact us
        to confirm current stock, sizes, variants and pricing.
      </p>
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
        {product.size && !availableSizes.length && (
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

      {catalogModels.length > 0 && (
        <BrandModelSelector productName={product.name} productCode={product.code} models={catalogModels} />
      )}

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
              .filter(([key]) => isPublicSpecification(key))
              .map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 px-6 py-4">
                  <div className="font-semibold text-gray-700 capitalize">{key}</div>
                  <div className="text-gray-600">{String(value)}</div>
                </div>
              ))}
          </div>
        </div>
      )}

      {false && (
        <div className="border rounded-3xl overflow-hidden mb-8">
          <div className="bg-gray-900 text-white px-6 py-4">
            <h2 className="text-2xl font-bold">Available Brands &amp; Models</h2>
            <p className="text-sm text-gray-300 mt-1">{catalogModels.length} catalogue entries</p>
          </div>
          <div className="divide-y max-h-[42rem] overflow-y-auto">
            {catalogModels.map((model, index) => (
              <div key={`${model.brand}-${model.name}-${index}`} className="px-6 py-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-semibold text-gray-900">{model.name}</h3>
                  <span className="text-sm font-medium text-red-700">{model.brand}</span>
                </div>
                {model.series && <p className="text-xs text-gray-500 mt-1">{model.series}</p>}
                {Object.keys(model.specifications).length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">{Object.entries(model.specifications).map(([key, value]) => `${key}: ${value}`).join(" · ")}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOX CONTENTS */}
      {product.box_contents && (
        <div className="border rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-4">What&apos;s In The Box</h2>
          <p className="text-gray-600 whitespace-pre-line">{product.box_contents}</p>
        </div>
      )}
    </>
  );
  const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.nooragencies.in",
    },

    {
      "@type": "ListItem",
      position: 2,
      name: "Categories",
      item: "https://www.nooragencies.in/categories",
    },

    {
      "@type": "ListItem",
      position: 3,
      name: product.category.replace(/-/g, " "),
      item: `https://www.nooragencies.in/categories/${product.category}`,
    },

    {
      "@type": "ListItem",
      position: 4,
      name: product.name,
      item: `https://www.nooragencies.in/products/${product.slug}`,
    },
  ],
}


  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>
    

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
          defaultImage={product.image || categoryIcon || null}
          sizeImages={product.size_images ?? {}}
          variants={variants}
          detailsTop={detailsTop}
          detailsBottom={detailsBottom}
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-12">
          {product.image || categoryIcon ? (
            <ProductImageLightbox src={product.image || categoryIcon!} alt={product.name} />
          ) : (
            <div className="border rounded-3xl overflow-hidden bg-white sticky top-24 self-start">
              <div className="aspect-square bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">Image pending</span>
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
            ) : catalogModels.length === 0 ? (
              <WhatsAppButton
                productName={product.name}
                productCode={product.code}
              />
            ) : null}

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
                category={product.category}
              />
            ))}
          </div>
        </div>
      )}

    </main>
  );
}
