import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";

export default async function CategoriesPage() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    return <div>Failed to load categories</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">Categories</h1>
          <p className="text-gray-600 mt-2">Manage product categories.</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Category Name</th>
              <th className="text-left p-4">Slug</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="p-4 font-medium">{category.name}</td>
                <td className="p-4 text-gray-600">{category.slug}</td>
                <td className="p-4 flex items-center gap-3">
                  <Link
                    href={`/admin/categories/${category.id}/edit`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                  <DeleteCategoryButton id={category.id} name={category.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}