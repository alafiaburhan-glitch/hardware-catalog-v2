"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";

type Product = { id: string; name: string; code: string; slug: string; image?: string };

const folders = [
  { name: "Power Tools", href: "/categories/power-tools", description: "Machines grouped by tool family, with all available brands and models." },
  { name: "Accessories", href: "/categories/power-tools/accessories", description: "Blades, wheels, bits, chisels, pads, hoses and other power-tool accessories." },
  { name: "Spare Parts", href: "/categories/power-tools/spare-parts", description: "Replacement parts for angle grinders, drills, breakers and related machines." },
];

export default function PowerToolsCategoryClient({ products }: { products: Product[] }) {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <div className="flex items-center gap-2 text-sm text-gray-400 mb-8"><Link href="/">Home</Link><span>/</span><Link href="/categories">Categories</Link><span>/</span><span className="text-gray-700 font-medium">Power Tools</span></div>
    <p className="text-red-700 font-semibold uppercase tracking-[0.24em] text-xs sm:text-sm mb-3">Category</p>
    <h1 className="text-3xl sm:text-4xl font-bold mb-3">Power Tools</h1>
    <p className="max-w-3xl text-gray-600 mb-8">Browse power tools by family. Each page lists every brand and model provided in the current catalogue.</p>
    <div className="grid gap-4 md:grid-cols-3 mb-12">
      {folders.map((folder) => <Link key={folder.href} href={folder.href} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-red-300 hover:-translate-y-0.5">
        <h2 className="text-xl font-bold mb-2">{folder.name}</h2><p className="text-sm leading-6 text-gray-600">{folder.description}</p>
      </Link>)}
    </div>
    <div className="flex items-end justify-between mb-6"><div><p className="text-red-700 font-semibold uppercase tracking-[0.2em] text-xs mb-2">Machines</p><h2 className="text-2xl sm:text-3xl font-bold">Power Tool Families</h2></div><span className="text-sm text-gray-500">{products.length} families</span></div>
    <div className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">{products.map((product) => <ProductCard key={product.id} {...product} category="power-tools" />)}</div>
  </div>;
}
