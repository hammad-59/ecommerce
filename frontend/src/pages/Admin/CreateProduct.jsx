import { useEffect, useState } from "react";
import { fetchBrands } from "../../store/reducers/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getProductMeta } from "../../store/reducers/productSlice";
import PageLoader from "../../components/PageLoader";

const CreateProduct = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    color: "",
    category: "",
    subCategory: "",
    stock: 0,
    price: 0,
    gender: "",
    productSize: "",
    brand: "",
    images: []
  });


  const meta = useSelector(state => state.products.meta)  

  const dispatch = useDispatch()

  const brandNames = useSelector((state) => state.brands.items);

  const { loading } = useSelector(state => state.products);

  useEffect(() => {
  const fetchMeta = async () => {
    try {
       dispatch(fetchBrands());
       dispatch(getProductMeta())
    } catch (err) {
      console.error(err);
    }
  };

  fetchMeta();
}, [dispatch]);


  const handleOnChange = (e) => {
      const {name, value, type} = e.target

      setProductForm((prev) => (
       { 
        ...prev, [name]: type === "number" ? Number(value) : value,
         ...(name === "category" && { subCategory: "" })
      }
      ))
  }


const handleFiles = (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  setProductForm(prev => {
    const totalImages = prev.images.length + files.length;
    if (totalImages > 3) {
      alert("Maximum 3 images allowed");
      return prev;
    }
    return {
      ...prev,
      images: [...prev.images, ...files], // new images add karo
    };
  });

  e.target.value = null; // same file dobara select karne ke liye
};

// Remove image function
const removeImage = (index) => {
  setProductForm(prev => ({
    ...prev,
    images: prev.images.filter((_, i) => i !== index)
  }));
};




  const handleFormSubmit = (e) => {

    e.preventDefault()

    const formData = new FormData();
    Object.entries(productForm).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach(img => formData.append("images", img))
      }
      else{
        formData.append(key, value)
      }
    })

    dispatch(createProduct(formData))

    setProductForm({
    name: "",
    description: "",
    color: "",
    category: "",
    subCategory: "",
    stock: 0,
    price: 0,
    gender: "",
    productSize: "",
    brand: "",
    images: []
    })
  }
return (
  <div className="max-w-5xl mx-auto p-6">
    {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
    <PageLoader/>
  </div>
)}
    <form
      onSubmit={handleFormSubmit}
      className="bg-white shadow-lg rounded-2xl p-6 space-y-6"
    >
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={productForm.name}
            onChange={handleOnChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            type="text"
            name="color"
            value={productForm.color}
            onChange={handleOnChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={productForm.category}
            onChange={handleOnChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select category</option>
            {meta?.category?.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* SubCategory */}
        <div>
          <label className="block text-sm font-medium mb-1">Sub Category</label>
          <select
            name="subCategory"
            value={productForm.subCategory}
            onChange={handleOnChange}
            disabled={!productForm.category}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select subCategory</option>
            {productForm.category &&
              meta?.subCategory?.[productForm.category]?.map((sc) => (
                <option key={sc} value={sc}>{sc}</option>
              ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={productForm.price}
            onChange={handleOnChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={productForm.stock}
            onChange={handleOnChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={productForm.gender}
            onChange={handleOnChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select gender</option>
            {meta?.gender?.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <select
            name="productSize"
            value={productForm.productSize}
            onChange={handleOnChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select size</option>
            {meta?.productSize?.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Brand</label>
          <select
            name="brand"
            value={productForm.brand}
            onChange={handleOnChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select brand</option>
            {brandNames?.map((b) => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={productForm.description}
            onChange={handleOnChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Images */}
       <div className="md:col-span-2">
  <label className="block text-sm font-medium mb-2">
    Upload Images (Max 3)
  </label>

  {/* Upload Box */}
  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition bg-gray-50">
    <div className="text-center">
      <p className="text-gray-500 text-sm">
        Drag & drop images here
      </p>
      <p className="text-xs text-gray-400">or click to browse</p>
    </div>

    <input
      type="file"
      multiple
      onChange={handleFiles}
      className="hidden"
    />
  </label>

  {/* Preview */}
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
    {productForm.images.map((img, index) => (
      <div
        key={index}
        className="relative group rounded-xl overflow-hidden border shadow-sm"
      >
        <img
          src={URL.createObjectURL(img)}
          className="w-full h-24 object-cover"
          alt="preview"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <button
            type="button"
            onClick={() => removeImage(index)}
            className="bg-red-500 text-white px-3 py-1 text-xs rounded-lg"
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Creating..." : "Create Product"}
      </button>
    </form>
  </div>
);
};

export default CreateProduct;
