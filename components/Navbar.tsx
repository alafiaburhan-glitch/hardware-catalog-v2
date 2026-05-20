import Link from "next/link";

export default function Navbar() {

  return (

    <header className="border-b bg-white sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}

        <Link
          href="/"
          className="text-3xl font-black tracking-wide"
        >

          <span className="text-black">
            NOOR
          </span>

          <span className="text-red-700">
            AGENCIES
          </span>

        </Link>

        {/* NAVIGATION */}

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

          <Link
            href="/"
            className="hover:text-red-700 transition"
          >

            Home

          </Link>

          <Link
            href="/categories/ropes"
            className="hover:text-red-700 transition"
          >

            Categories

          </Link>

          <Link
            href="/admin"
            className="hover:text-red-700 transition"
          >

            Admin

          </Link>

        </nav>

      </div>

    </header>
  );
}