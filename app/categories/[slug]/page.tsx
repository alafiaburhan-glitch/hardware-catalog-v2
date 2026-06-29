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
  const title = `${name} | Noor Agencies`;
  const description = `Browse our range of industrial ${name.toLowerCase()} — quality products at competitive prices. Noor Agencies, trusted hardware supplier.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://hardware-catalog-v2.vercel.app/categories/${slug}`,
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

  return (
    <CategoryPageClient
      slug={slug}
      categoryName={category?.name ?? slug.replace(/-/g, " ")}
      initialProducts={products ?? []}
      faqs={category?.faqs ?? []}
    />
  );
}