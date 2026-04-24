import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/reducers/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, totalPrice, loading } = useSelector(
    (state) => state.carts,
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
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
