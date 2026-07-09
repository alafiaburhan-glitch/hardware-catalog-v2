"use client";

import Image from "next/image";

interface Brand {
  name: string;
  logo: string;
}

const brandsRow1: Brand[] = [
  { name: "3M", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/3m.png" },
  { name: "Abro", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/abro.png" },
  { name: "Bosch", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/bosch.png" },
  { name: "DeWalt", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/dewalt.png" },
  { name: "Dongcheng", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/dongcheng.png" },
  { name: "Dowsil", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/dowsil.png" },
  { name: "Dutron", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/dutron.png" },
  { name: "Eastman", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/eastman.png" },
  { name: "Ferreterro", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/ferreterro.png" },
  { name: "Fevicol", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/fevicol.png" },
  { name: "Garware", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/garware.png" },
  { name: "Golden Bullet", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/golden%20bullet.png" },
  { name: "Jainson", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/jainson.png" },
  { name: "Taparia", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/taparia.png"}
];

const brandsRow2: Brand[] = [
  { name: "Janatics", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/janatics.jpg" },
  { name: "OKS", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/oks.png" },
  { name: "Patpolyn", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/patpolyn.png" },
  { name: "Polyflex", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/polyflex.png" },
  { name: "Raksha", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/raksha.png" },
  { name: "SRF", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/srf.png" },
  { name: "Stanley", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/stanley.png" },
  { name: "Tata", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/tata.png" },
  { name: "Techno", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/techno.png" },
  { name: "Tirupati Polyflex", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/tirupati_polyflex.png" },
  { name: "Tuqo", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/tuqo.jpg" },
  { name: "Ultrafast", logo: "https://lbbmvabcirbkzagrdmwj.supabase.co/storage/v1/object/public/products/uf.png" },
];

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="flex items-center justify-center shrink-0 mx-3 sm:mx-4 px-4 py-3 bg-white border border-gray-100 rounded-2xl h-16 sm:h-20 w-36 sm:w-44 shadow-sm">
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-contain p-2 grayscale hover:grayscale-0 transition duration-300"
        />
      </div>
    </div>
  );
}

function MarqueeRow({ brands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  const loopBrands = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden py-2">
      <div
        className="flex w-max"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} 40s linear infinite`,
        }}
      >
        {loopBrands.map((brand, i) => (
          <BrandCard key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export default function BrandsMarquee() {
  return (
    <div className="bg-gray-50 border-y border-gray-100 py-8">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">
        Trusted Brands We Supply
      </p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div className="space-y-3">
          <MarqueeRow brands={brandsRow1} />
          <MarqueeRow brands={brandsRow2} reverse />
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}