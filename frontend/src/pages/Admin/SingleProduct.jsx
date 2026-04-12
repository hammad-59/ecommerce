import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  editProductImage,
  editSingleProduct,
  getProductMeta,
  getSingleProduct,
} from "../../store/reducers/productSlice";
import { fetchBrands } from "../../store/reducers/brandSlice";
import PageLoader from "../../components/PageLoader";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProduct, loading } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.brands);
  const meta = useSelector((state) => state.products.meta);

  const [productItems, setProductItems] = useState({
    name: "",
    description: "",
    brand: "",
    color: "",
    category: "",
    subCategory: "",
    gender: "",
    productSize: "",
    stock: 1,
    price: 1,
    images: [],
  });

  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(getProductMeta());
  }, [dispatch]);

  useEffect(() => {
    if (id) dispatch(getSingleProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setProductItems({
        name: selectedProduct.name || "",
        brand: selectedProduct.brand?._id || "",
        description: selectedProduct.description || "",
        color: selectedProduct.color || "",
        category: selectedProduct.category || "",
        subCategory: selectedProduct.subCategory || "",
        gender: selectedProduct.gender || "",
        productSize: selectedProduct.productSize || "",
        price: selectedProduct.price || 1,
        stock: selectedProduct.stock || 1,
        images: selectedProduct.images || [],
      });
    }
  }, [selectedProduct]);

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setProductItems((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
      ...(name === "category" && { subCategory: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = { ...productItems };
    delete dataToSend.images;

    if (!dataToSend.gender) delete dataToSend.gender;
    if (!dataToSend.productSize) delete dataToSend.productSize;

    dispatch(editSingleProduct({ id, editProduct: dataToSend }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedImageId) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("imageId", selectedImageId);

    dispatch(editProductImage({ id, formData }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  if (!selectedProduct)
    return <p className="text-center">No product found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="mt-5 text-sm text-gray-600 hover:text-black"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-center">Edit Product</h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={productItems.name}
                onChange={handleOnChange}
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={productItems.description}
                onChange={handleOnChange}
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={productItems.color}
                onChange={handleOnChange}
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <select
                name="brand"
                value={productItems.brand}
                onChange={handleOnChange}
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select Brand</option>
                {items?.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={productItems.category}
                onChange={handleOnChange}
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select Category</option>
                {meta?.category?.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* SubCategory */}
            <div>
              <label className="block text-sm font-medium mb-1">SubCategory</label>
              <select
                name="subCategory"
                value={productItems.subCategory}
                onChange={handleOnChange}
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select SubCategory</option>
                {productItems.category &&
                  meta?.subCategory?.[productItems.category]?.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={productItems.gender}
                onChange={handleOnChange}
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select Gender</option>
                {meta?.gender?.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Size</label>
              <select
                name="productSize"
                value={productItems.productSize}
                onChange={handleOnChange}
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select Size</option>
                {meta?.productSize?.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={productItems.price}
                  onChange={handleOnChange}
                  className="w-full border p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={productItems.stock}
                  onChange={handleOnChange}
                  className="w-full border p-3 rounded-lg"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Update Product
            </button>

          </form>
        </div>

        {/* IMAGE CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6">Product Images</h2>

          <div className="grid grid-cols-1 gap-4 w-70 h-60">
            {productItems.images.map((img) => (
              <div key={img._id} className="border rounded-lg p-2">
                <img
                  src={img.url}
                  alt="product"
                  className="w-full h-50 object-contain bg-gray-100 rounded "
                />

                <button
                  onClick={() => {
                    setSelectedImageId(img._id);
                    document.getElementById("imageInput").click();
                  }}
                  className="mt-2 w-full bg-gray-700 text-white py-1 rounded hover:bg-gray-800"
                >
                  Replace
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Hidden file input */}
      <input
        type="file"
        id="imageInput"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
};

export default SingleProduct;