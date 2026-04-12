import { MdCategory } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { FaRuler } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleProduct,
  getProductMeta,
  getProducts,
} from "../../store/reducers/productSlice";
import { fetchBrands } from "../../store/reducers/brandSlice";
import Filters from "../../components/Filters";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PageLoader from "../../components/PageLoader";

const ProductList = () => {
  const { auth } = useAuth();

  const user = auth?.user;

  const [currentPage, setCurrentPage] = useState(1);
  const [dropDown, setDropDown] = useState(5);

  const [filterInputs, setFilterInputs] = useState({
    searchInput: "",
    categories: [],
    subCategories: [],
    gender: [],
  });

  const navigate = useNavigate();

  const products = useSelector((state) => state.products.productItems);
  // const total = useSelector((state) => state.products.total);
  const totalPages = useSelector((state) => state.products.totalPages);
  const loading = useSelector((state) => state.products.loading);
  const meta = useSelector((state) => state.products.meta);

  const dispatch = useDispatch();
  // console.log(total);
  // console.log(totalPages);
  // console.log(currentPage);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        dispatch(getProductMeta());
        dispatch(fetchBrands());
      } catch (err) {
        console.error(err);
      }
    };

    fetchMeta();
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getProducts({
        page: currentPage,
        limit: dropDown,
        search: filterInputs.searchInput,
        category: filterInputs.categories,
        subCategory: filterInputs.subCategories,
        gender: filterInputs.gender,
      }),
    );
  }, [
    dispatch,
    currentPage,
    dropDown,
    filterInputs.searchInput,
    filterInputs.categories,
    filterInputs.subCategories,
    filterInputs.gender,
  ]);

  // Derived subcategories (no state update needed)
  const subCategoriesToShow = filterInputs.categories.flatMap(
    (cat) => meta?.subCategory?.[cat] || [],
  );

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilterInputs((prev) => {
      if (type === "checkbox") {
        const arr = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...arr, value] }; // add value
        } else {
          return { ...prev, [name]: arr.filter((v) => v !== value) }; // remove value
        }
      } else {
        return { ...prev, [name]: value }; // text input
      }
    });

    setCurrentPage(1); // reset page on filter change
  };

  return (
    <>
      <Filters
        handleOnChange={handleOnChange}
        searchInput={filterInputs.searchInput}
        meta={meta}
        categories={filterInputs.categories}
        subCategoriesToShow={subCategoriesToShow}
        subCategories={filterInputs.subCategories}
        genderFilter={filterInputs.gender}
      />

      {loading ? (
        <PageLoader/>
      ) : products?.length === 0 ? (
        <>
          <div>
            <h1>No Products Found</h1>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    
    {products?.map((c) => {
      const {
        name,
        images,
        price,
        brand,
        stock,
        category,
        subCategory,
        color,
        productSize,
      } = c;

      return (
        <div
          key={c._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
        >
          {/* Image */}
          <div className="h-40 w-full bg-gray-100 flex items-center justify-center">
            <img
              src={images[0]?.url}
              alt={name}
              className="h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col gap-1">
            <h2 className="font-semibold text-lg line-clamp-1">{name}</h2>

            <p className="text-sm text-gray-500">
              {brand?.name} • {category}
            </p>

            <p className="text-green-600 font-bold">Rs {price}</p>

            {/* Extra Info */}
            <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-3">
              {subCategory && <span className="flex gap-1 items-center"><MdCategory/> {subCategory}</span>}
              {color && <span className="flex gap-1 items-center"><IoIosColorPalette/>{color}</span>}
              {productSize && <span className="flex gap-1 items-center"><FaRuler/> {productSize}</span>}
            </div>

            {/* Stock */}
            <p
              className={`text-sm font-medium mt-1 ${
                stock > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
            </p>

            {/* Buttons */}
            <div className="flex justify-between mt-3">
              {user?.role === "admin" ? (
                <>
                  <button
                    onClick={() =>
                      navigate(`/admin/singleProduct/${c._id}`)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      dispatch(deleteSingleProduct(c._id))
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </>
              ) : user?.role === "user" ? (
                <button
                  onClick={() =>
                    navigate(`/user/singleProduct/${c._id}`)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm w-full"
                >
                  View
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate(`/singleProduct/${c._id}`)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm w-full"
                >
                  View
                </button>
              )}
            </div>
          </div>
        </div>
      );
    })}

  </div>
</div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              dropDown={dropDown}
              setDropDown={setDropDown}
              totalPages={totalPages}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
