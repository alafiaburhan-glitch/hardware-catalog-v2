import Image from "next/image";

interface Brand {
  name: string;
  logo: string;
  scale?: "compact" | "wide";
}

const brandsRow1: Brand[] = [
  { name: "3M", logo: "/products/3m.png", scale: "compact" },
  { name: "Abro", logo: "/products/abro.png", scale: "wide" },
  { name: "Bosch", logo: "/products/bosch.png" },
  { name: "DeWalt", logo: "/products/dewalt.png", scale: "wide" },
  { name: "Dongcheng", logo: "/products/dongcheng.png", scale: "compact" },
  { name: "Dowsil", logo: "/products/dowsil.png", scale: "compact" },
  { name: "Dutron", logo: "/products/dutron.png" },
  { name: "Eastman", logo: "/products/eastman.png", scale: "compact" },
  { name: "Ferreterro", logo: "/products/ferreterro.png" },
  { name: "Fevicol", logo: "/products/fevicol.png", scale: "compact" },
  { name: "Loctite", logo: "/brands/loctite.svg", scale: "wide" },
  { name: "WD-40", logo: "/brands/wd-40.svg", scale: "compact" },
  { name: "Garware", logo: "/products/garware.png" },
  { name: "Golden Bullet", logo: "/products/golden bullet.png", scale: "wide" },
];

const brandsRow2: Brand[] = [
  { name: "Jainson", logo: "/products/jainson.png" },
  { name: "Taparia", logo: "/products/taparia.png", scale: "compact" },
  { name: "Janatics", logo: "/products/janatics.jpg", scale: "compact" },
  { name: "OKS", logo: "/products/oks.png", scale: "compact" },
  { name: "Patpolyn", logo: "/products/patpolyn.png", scale: "compact" },
  { name: "Polyflex", logo: "/products/polyflex.png", scale: "compact" },
  { name: "Raksha", logo: "/products/raksha.png" },
  { name: "SRF", logo: "/products/srf.png", scale: "compact" },
  { name: "Stanley", logo: "/products/stanley.png" },
  { name: "Tata", logo: "/products/tata.png", scale: "compact" },
  { name: "Techno", logo: "/products/techno.png" },
  { name: "Tirupati Polyflex", logo: "/products/tirupati_polyflex.png", scale: "compact" },
  { name: "Tuqo", logo: "/products/tuqo.jpg", scale: "compact" },
  { name: "Ultrafast", logo: "/products/uf.png", scale: "wide" },
];

function BrandCard({ brand, duplicate = false }: { brand: Brand; duplicate?: boolean }) {
  const imageSize =
    brand.scale === "wide"
      ? "h-7 sm:h-9 w-[88%]"
      : brand.scale === "compact"
        ? "h-11 sm:h-14 w-[72%]"
        : "h-10 sm:h-12 w-[82%]";

  return (
    <div
      aria-hidden={duplicate || undefined}
      className="mx-2 flex h-[72px] w-36 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-3 shadow-[0_4px_18px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_8px_24px_rgba(185,28,28,0.10)] sm:mx-2.5 sm:h-[88px] sm:w-44"
    >
      <div className={`relative ${imageSize}`}>
        <Image
          src={brand.logo}
          alt={duplicate ? "" : `${brand.name} logo`}
          fill
          sizes="(max-width: 640px) 115px, 145px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function MarqueeRow({ brands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  return (
    <div className="group overflow-hidden py-1.5">
      <div className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {brands.map((brand) => <BrandCard key={brand.name} brand={brand} />)}
        {brands.map((brand) => <BrandCard key={`${brand.name}-duplicate`} brand={brand} duplicate />)}
      </div>
    </div>
  );
}

export default function BrandsMarquee() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/80 py-9 sm:py-11" aria-labelledby="brands-heading">
      <div className="mx-auto mb-6 max-w-7xl px-5 text-center">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-red-700">Our brand network</p>
        <h2 id="brands-heading" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Trusted brands we supply
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent sm:w-28" />
        <div className="space-y-2.5">
          <MarqueeRow brands={brandsRow1} />
          <MarqueeRow brands={brandsRow2} reverse />
        </div>
      </div>
    </section>
  );
}
