import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../store/reducers/productSlice";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { addToCart } from "../store/reducers/cartSlice";

const ViewProduct = () => {
  const { selectedProduct, loading } = useSelector((state) => state.products);
  const { auth } = useAuth();
  const user = auth?.user;

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (id) dispatch(getSingleProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct?.images?.length) {
      setActiveImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-14 text-sm text-gray-600 hover:text-black"
      >
        ← Back
      </button>

      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">

        {/* Images Section */}
        <div>
          {/* Main Image */}
          <div className="border rounded-xl overflow-hidden mb-4 w-80 h-90 grid place-items-center">
            <img
              src={activeImage}
              alt={selectedProduct?.name}
              className="w-70 h-80 object-contain rounded-xl bg-gray-100"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 flex-wrap">
            {selectedProduct?.images?.map((img) => (
              <img
                key={img._id}
                src={img.url}
                alt="thumb"
                onClick={() => setActiveImage(img.url)}
                className="w-20 h-20 object-cover border rounded-lg cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4">

          <h1 className="text-3xl font-bold">{selectedProduct?.name}</h1>

          <p className="text-gray-600">{selectedProduct?.description}</p>

          <div className="text-lg font-semibold text-green-600">
            Rs.{selectedProduct?.price}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            <p><span className="font-medium">Category:</span> {selectedProduct?.category}</p>
            <p><span className="font-medium">Sub:</span> {selectedProduct?.subCategory}</p>
            <p><span className="font-medium">Color:</span> {selectedProduct?.color}</p>
            <p><span className="font-medium">Stock:</span> {selectedProduct?.stock}</p>
            <p><span className="font-medium">Brand:</span> {selectedProduct?.brand?.name}</p>
            <p><span className="font-medium">{selectedProduct?.gender ? "Gender:" : ""}</span> {selectedProduct?.gender}</p>
            <p><span className="font-medium">{selectedProduct?.productSize ? "Size:" : ""}</span> {selectedProduct?.productSize}</p>
          </div>

          {/* Actions */}
          <div className="pt-4">
            {user ? (
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition" onClick={() => dispatch(addToCart({id, qty:1}))}>
                Add to Cart
              </button>
            ) : (
              <NavLink
                to="/login"
                className="block text-center w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-black transition"
              >
                You Must Login First
              </NavLink>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewProduct;