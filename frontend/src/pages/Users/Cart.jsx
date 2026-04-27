import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartQuantity, getCart, removeCart } from "../../store/reducers/cartSlice";
import PageLoader from "../../components/PageLoader"

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, totalPrice, loading, totalLength } = useSelector(
    (state) => state.carts
  );

    const handleIncrement = (id) => {
        dispatch(cartQuantity({productId: id, qty: 1}))
    }

    const handleDecrement = (id) => {
      dispatch(cartQuantity({productId: id, qty: -1}))
    }

    const handleRemoveCart = (id) => {
      dispatch(removeCart(id))
    }


  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);



  return (
    <div>
      {loading && <PageLoader/>}
      <div>
        {!cartItems?.items || cartItems.items.length === 0 ? (
          <>
            <p>no items in cart</p>
          </>
        ) : (
          <ul>
            {cartItems?.items?.map((c) => (
              <li key={c._id}>
                <img
                  src={c.product?.images?.[0]?.url}
                  alt={c.product?.name}
                  width={100}
                  height={100}
                />
                <p>Name: {c.product?.name}</p>
                <p>Price: {c.product?.price}</p>
                <p>Qty: {c.quantity}</p>
                <span className="text-red-600">{c.product?.stock <= c.quantity && "Out of stock"}</span>
                <button onClick={() => handleIncrement(c.product._id)} disabled = {c.product?.stock <= c.quantity}>increment</button>
                <button onClick={() => handleDecrement(c.product._id)} disabled = {c.quantity === 1}>decrement</button>
                <button onClick={() => handleRemoveCart(c.product._id)}>remove</button>
              </li>
            ))}
            <h2>total price: {totalPrice}</h2>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
