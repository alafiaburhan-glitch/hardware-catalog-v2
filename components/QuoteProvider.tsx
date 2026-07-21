"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Check, ClipboardList, MessageCircle, Minus, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

export type QuoteItem = { key: string; productName: string; productCode: string; quantity: number; variants: Record<string, string> };
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
      if (existing) return current.map((item) => item.key === key ? { ...item, quantity: item.quantity + (input.quantity ?? 1) } : item);
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
      return [`${index + 1}. ${item.productName} (${item.productCode}) — Qty: ${item.quantity}`, ...options];
    });
    const message = ["Hi Noor Agencies, I would like a quote for:", "", ...lines, "", "Please share price and availability."].join("\n");
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
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl" aria-label="Quote list">
        <div className="flex items-center justify-between border-b px-5 py-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Your enquiry</p><h2 className="text-xl font-black">Request a quote</h2></div><button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-slate-100" aria-label="Close"><X className="h-5 w-5" /></button></div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {items.length === 0 ? <div className="py-16 text-center text-slate-500"><Check className="mx-auto mb-3 h-8 w-8" />Your quote list is empty.</div> : items.map((item) => <div key={item.key} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3"><div><h3 className="font-bold text-slate-900">{item.productName}</h3><p className="text-xs text-slate-500">{item.productCode}</p></div><button onClick={() => removeItem(item.key)} className="p-1.5 text-slate-400 hover:text-red-700" aria-label={`Remove ${item.productName}`}><Trash2 className="h-4 w-4" /></button></div>
            {Object.keys(item.variants).length > 0 && <p className="mt-2 text-sm text-slate-600">{Object.entries(item.variants).map(([key, value]) => `${key}: ${value}`).join(" · ")}</p>}
            <div className="mt-3 inline-flex items-center rounded-xl border"><button onClick={() => updateQuantity(item.key, -1)} className="p-2" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button><span className="min-w-9 text-center text-sm font-bold">{item.quantity}</span><button onClick={() => updateQuantity(item.key, 1)} className="p-2" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button></div>
          </div>)}
        </div>
        {items.length > 0 && <div className="border-t p-5"><button onClick={sendQuote} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-4 font-bold text-white transition hover:bg-green-700"><MessageCircle className="h-5 w-5" /> Send quote request on WhatsApp</button><p className="mt-2 text-center text-xs text-slate-500">You can review the message before sending it.</p></div>}
      </aside>
    </div>}
  </QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used inside QuoteProvider");
  return context;
}
