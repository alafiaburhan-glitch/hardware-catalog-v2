"use client";

import { useMemo, useState } from "react";
import type { PowerToolModel } from "@/data/powerTools";

export default function BrandModelSelector({ productName, productCode, models }: { productName: string; productCode: string; models: PowerToolModel[] }) {
  const brands = useMemo(() => [...new Set(models.map((model) => model.brand))].sort((a, b) => a.localeCompare(b)), [models]);
  const [brand, setBrand] = useState("");
  const [modelIndex, setModelIndex] = useState("");
  const choices = brand ? models.map((model, index) => ({ model, index })).filter(({ model }) => model.brand === brand) : [];
  const selected = modelIndex === "" ? undefined : models[Number(modelIndex)];
  const message = selected ? `Hi, I am interested in ${productName} (Code: ${productCode})\nBrand: ${selected.brand}\nModel: ${selected.name}` : "";

  return <section className="mb-8 overflow-hidden rounded-3xl border border-gray-200 bg-white">
    <div className="bg-gray-900 px-5 py-4 text-white sm:px-6"><h2 className="text-xl font-bold sm:text-2xl">Select Brand &amp; Model</h2><p className="mt-1 text-sm text-gray-300">Choose from {models.length} available catalogue entries.</p></div>
    <div className="space-y-5 p-5 sm:p-6">
      <label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">Available Brand</span><select value={brand} onChange={(event) => { setBrand(event.target.value); setModelIndex(""); }} className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-700"><option value="">Select a brand</option>{brands.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      <label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">Available Model</span><select value={modelIndex} disabled={!brand} onChange={(event) => setModelIndex(event.target.value)} className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-700 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"><option value="">{brand ? "Select a model" : "Select a brand first"}</option>{choices.map(({ model, index }) => <option key={`${model.name}-${index}`} value={index}>{model.name}</option>)}</select></label>
      {selected && <div className="rounded-2xl bg-red-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-700">Selected Product</p><h3 className="mt-2 text-lg font-bold text-gray-900">{selected.name}</h3><p className="text-sm font-medium text-red-700">{selected.brand}</p>{selected.series && <p className="mt-2 text-sm text-gray-600">Series: {selected.series}</p>}{Object.keys(selected.specifications).length > 0 && <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">{Object.entries(selected.specifications).map(([key, value]) => <div key={key}><dt className="font-semibold text-gray-700">{key}</dt><dd className="text-gray-600">{value}</dd></div>)}</dl>}<a href={`https://wa.me/919626652275?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700">WhatsApp for Quote</a></div>}
    </div>
  </section>;
}
