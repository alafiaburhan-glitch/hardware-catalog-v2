"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Check, ClipboardList, MessageCircle, Minus, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

export type QuoteItem = { key: string; productName: string; productCode: string; productImage?: string | null; quantity: number; variants: Record<string, string> };
type AddQuoteItem = Omit<QuoteItem, "key" | "quantity"> & { quantity?: number };
type QuoteContextValue = { items: QuoteItem[]; addItem: (item: AddQuoteItem) => void; openQuote: () => void };

const STORAGE_KEY = "noor-agencies-quote";
const QuoteContext = createContext<QuoteContextValue | null>(null);

function itemKey(item: Pick<QuoteItem, "productCode" | "variants">) {
  const options = Object.entries(item.variants).sort(([a], [b]) => a.localeCompare(b));
  return `${item.productCode}:${JSON.stringify(options)}`;
}

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setItems(JSON.parse(saved) as QuoteItem[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setHydrated(true);
      }
    });
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((input: AddQuoteItem) => {
    const key = itemKey(input);
    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) return current.map((item) => item.key === key ? { ...item, ...input, key, quantity: item.quantity + (input.quantity ?? 1) } : item);
      return [...current, { ...input, key, quantity: input.quantity ?? 1 }];
    });
    trackEvent("add_to_quote", { product_code: input.productCode, product_name: input.productName });
    toast.success("Added to quote list", { description: input.productName });
  }, []);

  const updateQuantity = (key: string, change: number) => setItems((current) => current.map((item) => item.key === key ? { ...item, quantity: Math.max(1, item.quantity + change) } : item));
  const removeItem = (key: string) => setItems((current) => current.filter((item) => item.key !== key));

  const sendQuote = () => {
    const lines = items.flatMap((item, index) => {
      const options = Object.entries(item.variants).map(([name, value]) => `   ${name}: ${value}`);
      return [
        `${index + 1}. *${item.productName}*`,
        `   Code: ${item.productCode}`,
        ...options,
        `   Quantity: ${item.quantity}`,
        "",
      ];
    });
    const message = [
      "*REQUEST FOR QUOTATION*",
      "",
      "Hello Noor Agencies,",
      "Please provide your best quotation for the following items:",
      "",
      ...lines,
      "Kindly include:",
      "• Unit price and GST",
      "• Stock availability",
      "• Delivery charges and lead time",
      "• Payment terms and quotation validity",
      "",
      "Thank you.",
    ].join("\n");
    trackEvent("quote_whatsapp", { item_count: items.length });
    window.open(`https://wa.me/919626652275?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const value = useMemo(() => ({ items, addItem, openQuote: () => setOpen(true) }), [addItem, items]);

  return <QuoteContext.Provider value={value}>
    {children}
    {hydrated && items.length > 0 && <button type="button" onClick={() => setOpen(true)} className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-2xl transition hover:bg-red-800 sm:bottom-6 sm:left-6" aria-label={`Open quote list with ${items.length} items`}>
      <ClipboardList className="h-5 w-5" /> Quote list <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs">{items.length}</span>
    </button>}
    {open && <div className="fixed inset-0 z-[100]">
      <button className="absolute inset-0 bg-black/45" onClick={() => setOpen(false)} aria-label="Close quote list" />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col bg-white shadow-2xl" aria-label="Quote list">
        <div className="flex items-center justify-between border-b px-5 py-5 sm:px-7">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Request for quotation</p><h2 className="text-xl font-black sm:text-2xl">RFQ summary</h2><p className="mt-1 text-sm text-slate-500">Review the selected products before sending.</p></div>
          <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-slate-100" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-7">
          {items.length === 0 ? <div className="py-16 text-center text-slate-500"><Check className="mx-auto mb-3 h-8 w-8" />Your quote list is empty.</div> : <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white"><tr><th className="w-12 px-4 py-3 text-center">#</th><th className="px-4 py-3">Product</th><th className="px-4 py-3">Specifications</th><th className="w-36 px-4 py-3 text-center">Qty</th><th className="w-14 px-3 py-3"><span className="sr-only">Remove</span></th></tr></thead>
                <tbody className="divide-y divide-slate-200">
                  {items.map((item, index) => <tr key={item.key} className="align-top odd:bg-white even:bg-slate-50/70">
                    <td className="px-4 py-4 text-center font-semibold text-slate-500">{index + 1}</td>
                    <td className="px-4 py-4"><div className="flex items-center gap-3">{item.productImage ? <Image src={item.productImage} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 bg-white object-contain p-1" /> : <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[10px] font-bold uppercase text-slate-400">No image</div>}<div><p className="font-bold text-slate-900">{item.productName}</p><p className="mt-1 text-xs font-medium text-slate-500">Code: {item.productCode}</p></div></div></td>
                    <td className="px-4 py-4 text-slate-600">{Object.keys(item.variants).length > 0 ? <dl className="space-y-1">{Object.entries(item.variants).map(([name, variant]) => <div key={name} className="flex gap-1"><dt className="font-semibold text-slate-700">{name}:</dt><dd>{variant}</dd></div>)}</dl> : <span className="text-slate-400">Standard</span>}</td>
                    <td className="px-4 py-4"><div className="mx-auto inline-flex items-center rounded-xl border border-slate-200 bg-white"><button onClick={() => updateQuantity(item.key, -1)} className="p-2 hover:bg-slate-100" aria-label={`Decrease quantity of ${item.productName}`}><Minus className="h-4 w-4" /></button><span className="min-w-9 text-center font-bold">{item.quantity}</span><button onClick={() => updateQuantity(item.key, 1)} className="p-2 hover:bg-slate-100" aria-label={`Increase quantity of ${item.productName}`}><Plus className="h-4 w-4" /></button></div></td>
                    <td className="px-3 py-4"><button onClick={() => removeItem(item.key)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-700" aria-label={`Remove ${item.productName}`}><Trash2 className="h-4 w-4" /></button></td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-200 bg-red-50/60 px-4 py-3 text-xs leading-5 text-slate-600">Quotation requested with unit price, GST, availability, delivery details, payment terms and validity.</div>
          </div>}
        </div>
        {items.length > 0 && <div className="border-t p-5 sm:px-7"><button onClick={sendQuote} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-4 font-bold text-white transition hover:bg-green-700"><MessageCircle className="h-5 w-5" /> Send RFQ on WhatsApp</button><p className="mt-2 text-center text-xs text-slate-500">WhatsApp opens with a clear, itemized quotation request.</p></div>}
      </aside>
    </div>}
  </QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used inside QuoteProvider");
  return context;
}
