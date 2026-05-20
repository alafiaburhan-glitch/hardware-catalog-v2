const categories = [
  {
    id: 1,
    name: "Hand Tools",
    slug: "hand-tools",
  },
  {
    id: 2,
    name: "Power Tools",
    slug: "power-tools",
  },
  {
    id: 3,
    name: "Ropes",
    slug: "ropes",
  },
  {
    id: 4,
    name: "Hoses",
    slug: "hoses",
  },
];

export default function CategoriesPage() {
  return (
    <div>

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Categories
          </h1>

          <p className="text-gray-600 mt-2">
            Manage product categories.
          </p>

        </div>

        <a
  href="/admin/categories/new"
  className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
>
  Add Category
</a>

      </div>

      {/* CATEGORY TABLE */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Category Name
              </th>

              <th className="text-left p-4">
                Slug
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr
                key={category.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {category.name}
                </td>

                <td className="p-4 text-gray-600">
                  {category.slug}
                </td>

                <td className="p-4 flex gap-3">

                  <a
  href={`/admin/categories/${category.id}/edit`}
  className="text-blue-600 hover:underline"
>
  Edit
</a>

                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}