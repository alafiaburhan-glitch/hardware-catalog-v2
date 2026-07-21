"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const categoryLinks = [
  ["Hand Tools", "/categories/hand-tools"],
  ["Power Tools", "/categories/power-tools"],
  ["Measuring Instruments", "/categories/measuring-instruments"],
  ["Pneumatic Fittings", "/categories/pneumatic-brass-fittings"],
  ["Lifting Equipment", "/categories/lifting-equipments"],
  ["Packaging Material", "/categories/packaging-material"],
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname !== "/") {
    return <footer className="border-t border-red-100 bg-red-50/60 px-5 py-5 text-center text-xs text-slate-500">
      <p>&copy; {currentYear} Noor Agencies. All rights reserved.</p>
    </footer>;
  }

  return <footer className="border-t border-red-100 bg-gradient-to-b from-red-50 via-white to-white text-slate-700">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.2fr] lg:py-16">
      <div>
        <Link href="/" className="inline-block" aria-label="Noor Agencies home">
          <span className="text-2xl font-black tracking-wide text-slate-950">NOOR <span className="text-red-700">AGENCIES</span></span>
          <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-slate-500">Industrial Hardware Supplier</span>
        </Link>
        <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">Industrial hardware, tools, lifting equipment, safety products, adhesives, hoses, tapes, and related supplies from Coimbatore.</p>
        <a href="https://wa.me/919626652275?text=Hi,%20I%20would%20like%20to%20enquire%20about%20your%20products." target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_click", { location: "footer" })} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700"><MessageCircle className="h-4 w-4" /> Enquire on WhatsApp</a>
      </div>

      <div>
        <h2 className="font-bold text-slate-950">Company</h2>
        <nav className="mt-4 grid gap-3 text-sm" aria-label="Footer company navigation">
          <Link href="/" className="hover:text-red-700">Home</Link>
          <Link href="/categories" className="hover:text-red-700">All Categories</Link>
          <Link href="/about" className="hover:text-red-700">About Us</Link>
          <Link href="/contact" className="hover:text-red-700">Contact</Link>
          <Link href="/search" className="hover:text-red-700">Search Products</Link>
        </nav>
      </div>

      <div>
        <h2 className="font-bold text-slate-950">Popular Categories</h2>
        <nav className="mt-4 grid gap-3 text-sm" aria-label="Footer category navigation">
          {categoryLinks.map(([label, href]) => <Link key={href} href={href} className="hover:text-red-700">{label}</Link>)}
        </nav>
      </div>

      <div>
        <h2 className="font-bold text-slate-950">Visit or contact us</h2>
        <div className="mt-4 space-y-4 text-sm">
          <a href="tel:+919626652275" onClick={() => trackEvent("phone_click", { location: "footer" })} className="flex items-start gap-3 hover:text-red-700"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-red-600" /><span>+91 96266 52275<br />+91 77089 14004</span></a>
          <a href="mailto:nooragenciescbe@gmail.com" className="flex items-start gap-3 break-all hover:text-red-700"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />nooragenciescbe@gmail.com</a>
          <a href="https://www.google.com/maps/dir//Noor+Agencies,+KLR+Complex,+569,+Cross+Cut+Rd,+Gandipuram,+Coimbatore,+Tamil+Nadu+641012" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("directions_click", { location: "footer" })} className="flex items-start gap-3 leading-6 hover:text-red-700"><MapPin className="mt-1 h-4 w-4 shrink-0 text-red-600" />KLR Complex, 569 Cross Cut Road, Gandipuram, Coimbatore 641012</a>
          <div className="flex items-start gap-3 leading-6"><Clock3 className="mt-1 h-4 w-4 shrink-0 text-red-500" /><span>Monday–Saturday<br />9:00 AM–7:00 PM</span></div>
        </div>
      </div>
    </div>

    <div className="border-t border-red-100 bg-red-50/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>&copy; {currentYear} Noor Agencies. All rights reserved.</p>
        <p>Industrial hardware supplier in Coimbatore, Tamil Nadu</p>
      </div>
    </div>
  </footer>;
}
