"use client";

import { ClipboardPlus } from "lucide-react";
import { useQuote } from "@/components/QuoteProvider";

export default function AddToQuoteButton({ productName, productCode, productImage = null, variants = {}, disabled = false }: { productName: string; productCode: string; productImage?: string | null; variants?: Record<string, string>; disabled?: boolean }) {
  const { addItem, openQuote } = useQuote();
  return <button type="button" disabled={disabled} onClick={() => { addItem({ productName, productCode, productImage, variants }); openQuote(); }} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-700 px-6 py-3 font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-slate-300"><ClipboardPlus className="h-5 w-5" /> Add to quote</button>;
}
