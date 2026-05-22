import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartQuantity,
  getCart,
  removeCart,
} from "../../store/reducers/cartSlice";
import PageLoader from "../../components/PageLoader";
import { NavLink } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import NoItems from "../../components/NoItems";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, totalPrice, loading, totalLength } = useSelector(
    (state) => state.carts,
  );

  const handleIncrement = (id) => {
    dispatch(cartQuantity({ productId: id, qty: 1 }));
  };

  const handleDecrement = (id) => {
    dispatch(cartQuantity({ productId: id, qty: -1 }));
  };

  const handleRemoveCart = (id) => {
    dispatch(removeCart(id));
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <>
      <div className="grid lg:grid-cols-3 lg:relative">
        {loading && <PageLoader />}
        {!cartItems?.items || cartItems.items.length === 0 ? (
          <>
            <NoItems/>
          </>
        ) : (
          
          <ul className="w-full col-span-2">
            {cartItems?.items?.map((c) => (
              <li key={c._id}>
                <div className="grid grid-cols-3 items-center justify-center shadow-lg shadow-gray-300 mx-3 md:mx-10 my-20 rounded-2xl">
                  <div className="grid grid-cols-1 place-items-center my-9 gap-3 md:my-6 md:gap-1">
                    <div className="bg-gray-100 p-3 rounded-xl shadow-lg w-22 h-27 md:w-30 md:h-35 flex justify-center">
                      <img
                        src={c.product?.images?.[0]?.url}
                        alt={c.product?.name}
                        className="rounded-md object-cover"
                      />
                    </div>

                    <p className="text-blue-700 md:text-xl font-bold text-center mx-2 mt-3">
                      {c.product?.name}
                    </p>
                    <p className="text-green-500 md:text-md font-bold">
                      Rs: {c.product?.price}
                    </p>
                    <span className="text-red-600 font-bold">
                      {c.product?.stock <= c.quantity && "Out of stock"}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row justify-center items-center text-xl font-bold gap-5">
                    <button
                      onClick={() => handleIncrement(c.product._id)}
                      disabled={c.product?.stock <= c.quantity}
                    >
                      <FaPlus />
                    </button>

                    <p className="border p-3 rounded-md">{c.quantity}</p>

                    <button
                      onClick={() => handleDecrement(c.product._id)}
                      disabled={c.quantity === 1}
                    >
                      <FaMinus />
                    </button>
                  </div>

                  <div className="flex justify-center items-center">
                    <button
                      className=" text-2xl font-bold text-red-500"
                      onClick={() => handleRemoveCart(c.product._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={`flex flex-col gap-5 w-70 h-45 justify-center items-center lg:sticky lg:top-50 xl:right-20 lg:right-10 p-10 bg-gray-200/50 m-10 rounded-lg shadow-lg ${!cartItems?.items || cartItems.items.length === 0 ? "hidden" : ""}`}>
          <h2 className="text-lg font-bold my-2">Total price: {totalPrice}</h2>
          <NavLink className="bg-black text-white rounded-md px-10 py-3" to="/user/checkout">
            Check Out
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Cart;
