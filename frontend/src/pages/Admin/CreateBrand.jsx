import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  deleteBrand,
  fetchBrands,
  updateBrand,
} from "../../store/reducers/brandSlice";
import PageLoader from "../../components/PageLoader";

const CreateBrand = () => {
  const dispatch = useDispatch();

  const [brandName, setBrandName] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const brandNames = useSelector((state) => state.brands.items);
  const loading = useSelector((state) => state.brands.loading);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!brandName.trim()) {
      setError("Brand name is required");
      return;
    }

    setError("");

    if (editId) {
      dispatch(
        updateBrand({
          id: editId,
          newName: brandName,
        }),
      );
      setEditId(null);
    } else {
      dispatch(createBrand({ name: brandName }));
    }

    setBrandName("");
  };

  const editBrand = (brand) => {
    setEditId(brand._id);
    setBrandName(brand.name);
  };

  const cancelEdit = () => {
    setEditId(null);
    setBrandName("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Brand Management</h1>

      {/* 🔹 Form Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
            <PageLoader />
          </div>
        )}
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Brand" : "Create Brand"}
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter brand name..."
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Saving..." : editId ? "Update" : "Create"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 🔹 Table Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Brands List</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {brandNames.map((brand) => (
                <tr key={brand._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{brand.name}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => editBrand(brand)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => dispatch(deleteBrand(brand._id))}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
