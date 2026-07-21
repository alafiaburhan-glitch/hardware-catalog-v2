"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Copy, MessageCircle, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

type ViewedProduct = {
  name: string;
  code: string;
  slug: string;
  image?: string | null;
  category?: string;
};

const STORAGE_KEY = "noor-agencies-recent-products";

export default function ProductEngagement({ product }: { product: ViewedProduct }) {
  const [recentProducts, setRecentProducts] = useState<ViewedProduct[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      let previous: ViewedProduct[] = [];
      try {
        previous = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as ViewedProduct[];
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }

      const otherProducts = previous.filter((item) => item.slug !== product.slug).slice(0, 5);
      setRecentProducts(otherProducts);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([product, ...otherProducts]));
      trackEvent("view_product", { product_name: product.name, product_code: product.code, category: product.category });
    });
  }, [product]);

  const productUrl = `https://www.nooragencies.in/products/${product.slug}`;
  const shareText = `${product.name} (${product.code}) from Noor Agencies`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(productUrl);
    setCopied(true);
    trackEvent("share_product", { method: "copy", product_code: product.code });
    toast.success("Product link copied");
    window.setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    if (!navigator.share) return copyLink();
    try {
      await navigator.share({ title: product.name, text: shareText, url: productUrl });
      trackEvent("share_product", { method: "native", product_code: product.code });
    } catch {
      // Closing the native share sheet is not an error the customer needs to see.
    }
  };

  return <>
    <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6" aria-label="Share this product">
      <div>
        <p className="font-bold text-slate-900">Share this product</p>
        <p className="mt-1 text-sm text-slate-500">Send it to your purchasing team or save the link for later.</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0">
        <button type="button" onClick={nativeShare} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-red-300 hover:text-red-700"><Share2 className="h-4 w-4" /> Share</button>
        <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-red-300 hover:text-red-700">{copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy link"}</button>
        <a href={`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${productUrl}`)}`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("share_product", { method: "whatsapp", product_code: product.code })} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"><MessageCircle className="h-4 w-4" /> Share on WhatsApp</a>
      </div>
    </section>

    {recentProducts.length > 0 && <section className="mt-16 border-t pt-12" aria-labelledby="recently-viewed-heading">
      <div className="mb-7 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-700"><Clock3 className="h-5 w-5" /></span><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Continue browsing</p><h2 id="recently-viewed-heading" className="text-2xl font-black">Recently viewed</h2></div></div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {recentProducts.map((item) => <Link key={item.slug} href={`/products/${item.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-red-200 hover:shadow-lg">
          <div className="relative aspect-[4/3] bg-slate-50">
            {item.image ? <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 50vw" className="object-contain p-3" /> : <div className="flex h-full items-center justify-center text-xs font-semibold text-slate-400">Image pending</div>}
          </div>
          <div className="p-3"><p className="text-xs font-bold text-red-700">{item.code}</p><h3 className="mt-1 line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-red-700">{item.name}</h3></div>
        </Link>)}
      </div>
    </section>}
  </>;
}
