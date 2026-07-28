"use client";

import { ClipboardPlus } from "lucide-react";
import { useQuote } from "@/components/QuoteProvider";

export default function AddToQuoteButton({ productName, productCode, productSlug, productImage = null, variants = {}, disabled = false }: { productName: string; productCode: string; productSlug: string; productImage?: string | null; variants?: Record<string, string>; disabled?: boolean }) {
  const { addItem, openQuote } = useQuote();
  return <button type="button" disabled={disabled} onClick={() => { addItem({ productName, productCode, productSlug, productImage, variants }); openQuote(); }} className="inline-flex h-12 w-44 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-red-700 px-5 text-sm font-bold leading-none text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-slate-300"><ClipboardPlus className="h-5 w-5 shrink-0" /> Add to quote</button>;
}
