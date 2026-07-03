import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import CategoryPageClient from "@/components/CategoryPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: category } = await supabase
    .from("categories")
    .select("name")
    .eq("slug", slug)
    .single();

  const name = category?.name ?? slug.replace(/-/g, " ");

  return {
    title: `${name} | Noor Agencies`,
    description: `Browse our range of industrial ${name.toLowerCase()} products from Noor Agencies.`,
    alternates: {
      canonical: `https://nooragencies.in/categories/${slug}`,
    },
    openGraph: {
      title: `${name} | Noor Agencies`,
      description: `Browse our range of industrial ${name.toLowerCase()} products from Noor Agencies.`,
      url: `https://nooragencies.in/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const { data: category } = await supabase
    .from("categories")
    .select("name, faqs")
    .eq("slug", slug)
    .single();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name: category?.name,

    url: `https://nooragencies.in/categories/${slug}`,

    description: `Browse ${category?.name} products from Noor Agencies.`,

    isPartOf: {
      "@type": "WebSite",
      name: "Noor Agencies",
      url: "https://nooragencies.in",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://nooragencies.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: "https://nooragencies.in/categories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category?.name ?? slug.replace(/-/g, " "),
        item: `https://nooragencies.in/categories/${slug}`,
      },
    ],
  };
  const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",

  name: `${category?.name} Products`,

  itemListOrder: "https://schema.org/ItemListOrderAscending",

  numberOfItems: products?.length ?? 0,

  itemListElement:
    products?.map((product, index) => ({
      "@type": "ListItem",

      position: index + 1,

      url: `https://nooragencies.in/products/${product.slug}`,

      name: product.name,
    })) ?? [],
};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(itemListSchema),
  }}
/>

      <CategoryPageClient
        slug={slug}
        categoryName={category?.name ?? slug.replace(/-/g, " ")}
        initialProducts={products ?? []}
        faqs={category?.faqs ?? []}
      />
    </>
  );
}