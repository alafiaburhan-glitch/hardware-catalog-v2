import type { Metadata } from "next";
import Link from "next/link";
import { Boxes, CheckCircle2, MapPin, MessageCircle, PackageSearch, ShieldCheck, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Noor Agencies, an industrial hardware and tools supplier serving businesses, workshops, maintenance teams, and industries from Coimbatore.",
  alternates: { canonical: "/about" },
};

const capabilities = [
  { icon: Boxes, title: "Broad industrial catalog", description: "Tools, lifting equipment, safety products, hoses, tapes, adhesives, measuring instruments, fittings, and related supplies." },
  { icon: PackageSearch, title: "Specification-based sourcing", description: "Enquiries can include brand, size, capacity, material, quantity, and intended application for a more accurate quotation." },
  { icon: ShieldCheck, title: "Business-focused support", description: "Support for workshops, maintenance requirements, commercial purchasing, and bulk industrial supply enquiries." },
  { icon: Truck, title: "Supply coordination", description: "Availability and delivery options are confirmed according to the product, order quantity, and destination." },
];

const industries = ["Manufacturing", "Fabrication", "Construction", "Automotive workshops", "Maintenance teams", "Warehousing", "Agriculture", "Commercial purchasing"];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Noor Agencies",
    url: "https://www.nooragencies.in/about",
    mainEntity: {
      "@type": "HardwareStore",
      name: "Noor Agencies",
      url: "https://www.nooragencies.in",
      telephone: "+91-9626652275",
      email: "nooragenciescbe@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "KLR Complex, 569 Cross Cut Road, Gandipuram",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        postalCode: "641012",
        addressCountry: "IN",
      },
    },
  };

  return <main className="bg-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

    <section className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-slate-950 text-white">
      <div className="industrial-grid absolute inset-0 opacity-15" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-red-200">About Noor Agencies</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Industrial supply built around real requirements.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-red-100 sm:text-lg">For more than 10 years, Noor Agencies has supported businesses with industrial hardware, tools, lifting solutions, safety products, and related supplies from Coimbatore.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/categories" className="rounded-2xl bg-white px-6 py-3.5 text-center font-bold text-red-800 transition hover:bg-red-50">Browse the catalog</Link>
            <a href="https://wa.me/919626652275?text=Hi,%20I%20would%20like%20to%20discuss%20an%20industrial%20supply%20requirement." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-3.5 font-bold transition hover:bg-white/20"><MessageCircle className="h-5 w-5" /> Discuss a requirement</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur"><p className="text-3xl font-black">10+</p><p className="mt-1 text-xs uppercase tracking-[0.15em] text-red-200">Years serving industry</p></div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur"><MapPin className="h-7 w-7 text-red-200" /><p className="mt-3 text-sm font-bold">Coimbatore, Tamil Nadu</p></div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
      <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">What we provide</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">A practical partner for industrial purchasing</h2><p className="mt-5 text-base leading-8 text-slate-600">Our catalog is designed to help customers identify the right product family, review available specifications, and send a complete enquiry for current pricing and availability.</p></div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map(({ icon: Icon, title, description }) => <article key={title} className="rounded-3xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700"><Icon className="h-6 w-6" /></span><h3 className="mt-5 text-lg font-black text-slate-900">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></article>)}
      </div>
    </section>

    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">How we help</p><h2 className="mt-3 text-3xl font-black text-slate-950">From requirement to quotation</h2><div className="mt-8 space-y-6">
          {["Browse or search the catalog to identify the product family.", "Select available brands, sizes, capacities, or other specifications.", "Add multiple products and quantities to one quote request.", "Confirm current availability, pricing, and delivery options with our team."].map((step, index) => <div key={step} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-700 text-sm font-black text-white">{index + 1}</span><p className="pt-1 text-sm leading-6 text-slate-700 sm:text-base">{step}</p></div>)}
        </div></div>
        <div className="rounded-[2rem] bg-slate-950 p-7 text-white sm:p-9"><h2 className="text-2xl font-black">Industries and teams we support</h2><p className="mt-3 text-sm leading-6 text-slate-400">Our product range covers common purchasing requirements across industrial, workshop, construction, maintenance, and commercial environments.</p><div className="mt-7 flex flex-wrap gap-2">{industries.map((industry) => <span key={industry} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm"><CheckCircle2 className="h-4 w-4 text-red-400" />{industry}</span>)}</div></div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
      <div className="rounded-[2rem] bg-gradient-to-r from-red-800 to-red-700 px-6 py-10 text-center text-white sm:px-10 md:flex md:items-center md:justify-between md:text-left"><div><h2 className="text-2xl font-black sm:text-3xl">Have a product list or recurring requirement?</h2><p className="mt-2 text-sm text-red-100 sm:text-base">Send the specifications and quantities for a consolidated quotation.</p></div><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:mt-0"><Link href="/contact" className="rounded-xl bg-white px-6 py-3 font-bold text-red-800">Send an enquiry</Link><a href="tel:+919626652275" className="rounded-xl border border-white/30 px-6 py-3 font-bold">Call +91 96266 52275</a></div></div>
    </section>
  </main>;
}
