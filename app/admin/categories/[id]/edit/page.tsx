type EditCategoryPageProps = {
  params: {
    id: string;
  };
};

export default function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  return (
    <div className="max-w-3xl">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Edit Category
        </h1>

        <p className="text-gray-600 mt-2">
          Editing category ID: {params.id}
        </p>

      </div>

      {/* FORM */}

      <form className="bg-white p-8 rounded-2xl shadow-sm space-y-6">

        <div>

          <label className="block font-medium mb-2">
            Category Name
          </label>

          <input
            type="text"
            defaultValue="Hand Tools"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        <div>

          <label className="block font-medium mb-2">
            Slug
          </label>

          <input
            type="text"
            defaultValue="hand-tools"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >

          Update Category

        </button>

      </form>

    </div>
  );
}