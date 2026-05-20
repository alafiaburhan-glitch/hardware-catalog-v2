export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}

      <aside className="w-72 bg-black text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          Noor Admin
        </h1>

        <nav className="space-y-4">

          <a
            href="/admin"
            className="block bg-white/10 px-4 py-3 rounded-xl hover:bg-white/20 transition"
          >
            Dashboard
          </a>

          <a
            href="/admin/products"
            className="block px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            Products
          </a>

          <a
            href="/admin/categories"
            className="block px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            Categories
          </a>

          <a
            href="/admin/editors"
            className="block px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            Editors
          </a>

        </nav>

      </aside>

      {/* MAIN CONTENT */}

      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}