export default function AdminPage() {
  return (
    <div>

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Welcome to Noor Agencies admin panel.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-500">
            Total Products
          </h2>

          <p className="text-4xl font-bold mt-4">
            0
          </p>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-500">
            Categories
          </h2>

          <p className="text-4xl font-bold mt-4">
            8
          </p>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-500">
            Editors
          </h2>

          <p className="text-4xl font-bold mt-4">
            1
          </p>

        </div>

      </div>

    </div>
  );
}