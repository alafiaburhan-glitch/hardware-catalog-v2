"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import TrustSection from "@/components/TrustSection";
import BrandsMarquee from "@/components/BrandsMarquee";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import {
  ArrowRight,
  BadgeIndianRupee,
  CheckCircle2,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type CategorySummary = {
  id: number | string;
  name: string;
  slug: string | null;
};

type FeaturedProduct = {
  id: number | string;
  name: string;
  code: string;
  image?: string | null;
  slug?: string | null;
  category?: string | null;
};

const categoryIcons: Record<string, string> = {
  "emery-paper": "/category-icons/emery-papers.png",
  "emery-papers": "/category-icons/emery-papers.png",
  "emery-roll": "/category-icons/emery-roll.png",
  "emery-rolls": "/category-icons/emery-roll.png",
  "hand-tools": "/category-icons/hand-tools.png",
  "power-tools": "/category-icons/power-tools.png",
  ropes: "/category-icons/ropes.png",
  hoses: "/category-icons/hoses.png",
  "safety-products": "/category-icons/safety-products.png",
  "lifting-equipment": "/category-icons/lifting-equipment.png",
  "lifting-equipments": "/category-icons/lifting-equipments.png",
  "lifting-slings": "/category-icons/lifting-slings.png",
  "shade-nets": "/category-icons/shade-nets.png",
  tarpaulins: "/category-icons/tarpaulins.png",
  ladders: "/category-icons/ladders-sections.png",
  "ladders-sections": "/category-icons/ladders-sections.png",
  "heat-insulation": "/category-icons/heat-insulation.png",
  "industrial-adhesives": "/category-icons/industrial-adhesives.png",
  "industrial-adhesives-sealants":
    "/category-icons/industrial-adhesives-sealants.png",
  "lubricants-sealants": "/category-icons/lubricants-sealants.png",
  "packaging-material": "/category-icons/packaging-material.png",
  tapes: "/category-icons/tapes.png",
  "pneumatic-brass-fittings": "/category-icons/pneumatic-brass-fittings.png",
  "measuring-instruments": "/category-icons/measuring-instruments-red.png",
};

function getCategoryIcon(slug: string | null) {
  if (!slug) return null;
  return categoryIcons[slug.trim().toLowerCase()] ?? null;
}

export default function HomePageClient() {
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: categoryData } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name");
      const validCategories = (categoryData ?? []).filter((category) => category.slug?.trim());
      if (!validCategories.some((category) => category.slug?.trim() === "pneumatic-brass-fittings")) {
        validCategories.push({ id: "local-pneumatic-brass-fittings", name: "Pneumatic & Brass Fittings", slug: "pneumatic-brass-fittings" });
      }
      if (!validCategories.some((category) => category.slug?.trim() === "measuring-instruments")) {
        validCategories.push({ id: "local-measuring-instruments", name: "Measuring Instruments", slug: "measuring-instruments" });
      }
      setCategories(validCategories);
      setLoadingCategories(false);

      const { count } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true });
      setTotalProductCount(count ?? 0);

      let { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(8);

      if (!productData || productData.length === 0) {
        const { data: fallback } = await supabase
          .from("products")
          .select("*")
          .limit(8);
        productData = fallback;
      }

      if (productData) {
        setProducts(productData.filter((product) => product.slug?.trim()));
      }
      setLoadingProducts(false);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-black text-white">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.22),transparent_34%),radial-gradient(circle_at_88%_70%,rgba(127,29,29,0.2),transparent_40%)]" />
        <div className="industrial-grid absolute inset-0 -z-10 opacity-15" />
        <motion.div
          aria-hidden
          className="absolute -left-32 top-28 h-80 w-80 rounded-full border border-white/20"
          animate={{ scale: [1, 1.12, 1], rotate: [0, 18, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-4xl"
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white backdrop-blur-xl">
              <Sparkles className="h-4 w-4" /> Coimbatore&apos;s industrial supply partner
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl xl:text-7xl">
              Built for work.
              <span className="mt-2 block text-red-100">
                Ready for industry.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              Hardware, lifting equipment, safety products, adhesives and power tools—sourced for serious work and delivered with dependable support.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/categories" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-red-800 shadow-[0_18px_50px_rgba(255,255,255,0.12)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(255,255,255,0.2)]">
                Explore the catalog <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
              <a href="https://wa.me/919626652275?text=Hi,%20I%20would%20like%20to%20enquire%20about%20your%20products." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/35 bg-white/15 px-7 py-4 font-bold text-white backdrop-blur-xl transition hover:bg-white/25">
                <MessageCircle className="h-5 w-5" /> Get a quick quote
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-7">
              {[['10+', 'Years'], [totalProductCount ? `${totalProductCount}+` : '—', 'Products'], [categories.length || '—', 'Categories']].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black sm:text-3xl">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/65">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        <div className="border-t border-white/20 bg-red-800/20 backdrop-blur-xl">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:grid-cols-4 sm:px-6">
            {[
              [ShieldCheck, 'Quality checked'],
              [PackageCheck, 'Wide catalog'],
              [BadgeIndianRupee, 'Bulk pricing'],
              [Truck, 'Pan-India supply'],
            ].map(([Icon, label]) => {
              const FeatureIcon = Icon as typeof ShieldCheck;
              return <div key={label as string} className="flex items-center gap-3 border-white/10 px-3 py-4 text-sm font-semibold text-red-50 sm:border-l"><FeatureIcon className="h-5 w-5 text-red-300" />{label as string}</div>;
            })}
          </div>
        </div>
      </section>


      {/* BRANDS MARQUEE */}
      <BrandsMarquee />

      {/* CATEGORIES */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-2 text-xs sm:text-sm">
              Browse Products
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Product Categories</h2>
          </div>
          <Link href="/categories" className="text-red-700 font-semibold hover:underline text-sm shrink-0 ml-4">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {loadingCategories
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-16 sm:h-20 rounded-2xl bg-gray-100 animate-pulse" />
              ))
            : categories.map((category) => {
                const icon = getCategoryIcon(category.slug);

                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug!.trim()}`}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-red-200 hover:shadow-[0_24px_60px_rgba(127,29,29,0.12)] sm:rounded-3xl sm:p-6"
                  >
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-100/0 blur-2xl transition group-hover:bg-red-100" />
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        {icon && (
                          <Image
                            src={icon}
                            alt=""
                            width={56}
                            height={56}
                            sizes="56px"
                            className="h-14 w-14 shrink-0 rounded-2xl bg-white object-contain p-1.5 shadow-sm transition duration-300 group-hover:scale-110 group-hover:rotate-3"
                          />
                        )}
                        <h3 className="min-w-0 break-words text-[13px] font-bold leading-tight group-hover:text-red-700 transition min-[390px]:text-[14px] sm:text-base">
                          {category.name}
                        </h3>
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-700 transition group-hover:translate-x-1 group-hover:bg-red-700 group-hover:text-white"><ArrowRight className="h-4 w-4" /></span>
                    </div>
                  </Link>
                );
              })}
        </div>
      </motion.section>

      {/* FEATURED PRODUCTS — carousel */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-50 py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-2 text-xs sm:text-sm">
                Featured Products
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Popular Products</h2>
            </div>
            <Link href="/categories" className="text-red-700 font-semibold hover:underline text-sm shrink-0 ml-4">
              View All →
            </Link>
          </div>

          {loadingProducts ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-none w-[70vw] sm:w-[45vw] md:w-[23%] h-64 rounded-3xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <FeaturedCarousel products={products} />
          ) : null}
        </div>
      </motion.section>

      {/* TRUST SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white border-t border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-xs sm:text-sm">
                Trusted Across Industries
              </p>
              <div className="mb-4 flex items-baseline">
                <Counter
                  value={10}
                  places={[10, 1]}
                  fontSize={60}
                  padding={5}
                  gap={4}
                  textColor="#b91c1c"
                  fontWeight={800}
                />
                <span className="text-5xl sm:text-6xl font-extrabold text-red-700">+</span>
              </div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Years of delivering trusted industrial hardware, lifting solutions,
                ropes, tarpaulins, and safety products across industries.
              </p>
            </div>
            <TrustSection
              productCount={totalProductCount}
              categoryCount={categories.length}
            />
          </div>
        </div>
      </motion.section>

      {/* ABOUT */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-3 text-xs sm:text-sm">
              About Noor Agencies
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
              Reliable Industrial Supply Partner
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
              Noor Agencies has been serving industries with high-quality industrial
              hardware products, ropes, lifting equipment, tarpaulins, cargo solutions,
              and safety materials for over 10 years.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="inline-block bg-red-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-800 transition text-sm">
                Read More
              </Link>
              <Link href="/contact" className="inline-block border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-semibold hover:border-red-300 hover:text-red-700 transition text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#dc2626_0%,#b91c1c_48%,#7f1d1d_100%)] p-7 text-white shadow-[0_28px_80px_rgba(127,29,29,0.24)] sm:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-red-950/25 blur-3xl" />
            <h3 className="text-xl sm:text-2xl font-bold mb-5">Why Choose Us?</h3>
            <ul className="space-y-3 sm:space-y-4 text-red-100">
              {[
                "Premium Quality Products",
                "Trusted Industry Experience",
                "Competitive Pricing",
                "Reliable Customer Support",
                "Fast Product Availability",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm sm:text-base">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-red-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* CTA BANNER */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-red-800 to-red-700 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Ready to place an order?</h2>
            <p className="text-red-200 text-sm sm:text-base">Get in touch with us directly for bulk pricing and availability.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://wa.me/919626652275"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="tel:+919626652275"
              className="bg-white text-red-700 px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition text-sm sm:text-base"
            >
              Call Now
            </a>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
