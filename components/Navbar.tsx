import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}

          <Link href="/" className="flex flex-col">

            <span className="text-3xl font-black tracking-wide">
              <span className="text-black">NOOR</span>
              <span className="text-red-700"> AGENCIES</span>
            </span>

            <span className="text-xs text-gray-500">
              Industrial Hardware Supplier
            </span>

          </Link>

          {/* NAVIGATION */}

          <nav className="hidden md:flex items-center gap-8 font-medium">

            <Link
              href="/"
              className="hover:text-red-700 transition"
            >
              Home
            </Link>

            <Link
              href="/categories"
              className="hover:text-red-700 transition"
            >
              Categories
            </Link>

            <Link
              href="/about"
              className="hover:text-red-700 transition"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="hover:text-red-700 transition"
            >
              Contact
            </Link>

          </nav>

          {/* CTA */}

          <a
            href="tel:+919894084576"
            className="bg-red-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-800 transition"
          >
            Call Now
          </a>

        </div>

      </div>

    </header>
  );
}