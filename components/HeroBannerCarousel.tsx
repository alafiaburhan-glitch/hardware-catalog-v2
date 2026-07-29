"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

const INTERVAL_MS = 7_000;

const products = [
  { name: "Tarpaulins", image: "/products/tarp_nylon.jpg", href: "/categories/tarpaulins" },
  { name: "Power tools", image: "/products/power-tools/animated/angle-grinder.png", href: "/categories/power-tools" },
  { name: "Lifting slings", image: "/products/lifting-equipment/webbing-sling-all-colours.webp", href: "/categories/lifting-equipments" },
];

export default function HeroBannerCarousel({
  categoryCount,
  productCount,
}: {
  categoryCount: number;
  productCount: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % 3), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  const goTo = (index: number) => setActive((index + 3) % 3);

  return (
    <section
      aria-label="Noor Agencies highlights"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-slate-950 text-white"
    >
      <div className="relative h-[680px] sm:h-[620px] lg:h-[560px]">
      <AnimatePresence mode="wait">
        {active === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 h-full overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-black"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.22),transparent_34%),radial-gradient(circle_at_88%_70%,rgba(127,29,29,0.2),transparent_40%)]" />
            <div className="industrial-grid absolute inset-0 opacity-15" />
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-14">
              <div className="max-w-4xl">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] backdrop-blur-xl">
                  <Sparkles className="h-4 w-4" /> Coimbatore&apos;s industrial supply partner
                </div>
                <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl xl:text-7xl">
                  Built for work.<span className="mt-2 block text-red-100">Ready for industry.</span>
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                  Hardware, lifting equipment, safety products, adhesives and power tools—sourced for serious work and delivered with dependable support.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href="/categories" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-red-800 transition hover:-translate-y-1">
                    Explore the catalog <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </Link>
                  <a href="https://wa.me/919626652275?text=Hi,%20I%20would%20like%20to%20enquire%20about%20your%20products." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/35 bg-white/15 px-7 py-4 font-bold backdrop-blur-xl transition hover:bg-white/25">
                    <MessageCircle className="h-5 w-5" /> Get a quick quote
                  </a>
                </div>
                <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-7">
                  {[["10+", "Years"], [productCount ? `${productCount}+` : "—", "Products"], [categoryCount || "—", "Categories"]].map(([value, label]) => (
                    <div key={label}><p className="text-2xl font-black sm:text-3xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/65">{label}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {active === 1 && (
          <motion.div
            key="products"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 h-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-red-950"
          >
            <div className="industrial-grid absolute inset-0 opacity-10" />
            <div className="relative mx-auto grid h-full max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-red-300">Hero products</p>
                <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Cover. Power. Lift.</h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                  Job-ready tarpaulins, dependable power tools, and lifting solutions for workshops, sites, transport, and industry.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {products.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold transition hover:border-red-400 hover:bg-red-600"
                    >
                      {product.name} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {products.map((product, index) => (
                  <Link key={product.name} href={product.href} className={`group rounded-2xl bg-white p-2 text-slate-950 shadow-2xl transition hover:-translate-y-2 sm:rounded-[2rem] sm:p-4 ${index === 1 ? "lg:-translate-y-7" : ""}`}>
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 sm:rounded-2xl">
                      <Image src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 30vw, 220px" className="object-contain p-1 transition duration-500 group-hover:scale-105 sm:p-3" />
                    </div>
                    <p className="mt-2 text-xs font-black sm:mt-3 sm:text-base">{product.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {active === 2 && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 h-full overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-orange-600"
          >
            <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
            <div className="relative mx-auto grid h-full max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-red-100">Talk to our team</p>
                <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Tell us what the job needs.</h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-red-50 sm:text-lg">Get availability, bulk pricing, and practical help from our Coimbatore team.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="https://wa.me/919626652275?text=Hi,%20I%20would%20like%20to%20enquire%20about%20your%20products." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3.5 font-bold transition hover:bg-green-500">
                    <MessageCircle className="h-5 w-5" /> WhatsApp us
                  </a>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-bold text-red-800 transition hover:bg-red-50">
                    Contact details <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/20 bg-slate-950/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-300">Noor Agencies</p>
                <div className="mt-6 space-y-5">
                  <a href="tel:+919626652275" className="flex gap-4 hover:text-red-200"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-red-300" /><span className="font-semibold">+91 96266 52275<br />+91 77089 14004</span></a>
                  <a href="https://www.google.com/maps/dir//Noor+Agencies,+No.+21,+Dr.+Nanjappa+Road,+Coimbatore,+Tamil+Nadu+641018" target="_blank" rel="noopener noreferrer" className="flex gap-4 leading-6 hover:text-red-200"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-300" /><span>No. 21, Dr. Nanjappa Road,<br />Coimbatore 641018</span></a>
                  <div className="flex gap-4 text-slate-300"><Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-red-300" /><span>Monday–Saturday<br />9:00 AM–7:00 PM</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-slate-950/35 px-2 py-1.5 backdrop-blur-sm">
        {[0, 1, 2].map((index) => (
          <button type="button" key={index} onClick={() => goTo(index)} aria-label={`Show banner ${index + 1}`} aria-current={active === index ? "true" : undefined} className={`h-1.5 rounded-full transition-all ${active === index ? "w-4 bg-white/85" : "w-1.5 bg-white/35 hover:bg-white/55"}`} />
        ))}
      </div>
    </section>
  );
}
