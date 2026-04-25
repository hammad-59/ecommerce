import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartQuantity, getCart } from "../../store/reducers/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, totalPrice, loading } = useSelector(
    (state) => state.carts,
  );

    const handleIncrement = (id) => {
        dispatch(cartQuantity({productId: id, qty: 1}))
    }


  useEffect(() => {
    dispatch(getCart());
    handleIncrement()
  }, [dispatch]);



  return (
    <div>
      {loading && <p>loading</p>}
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
                <button onClick={() => handleIncrement(c.product._id)}>Inc</button>
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
