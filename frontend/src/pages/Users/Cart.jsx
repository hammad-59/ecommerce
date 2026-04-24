import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../store/reducers/cartSlice'

const Cart = () => {

  const dispatch = useDispatch()

  const { cartItems, loading } = useSelector(state => state.carts)

  console.log(cartItems);
  

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <ul>
        {cartItems?.items?.map((c) => (
          <li key={c._id}>
            <p>Name: {c.product.name}</p>
            <p>Price: {c.product.price}</p>
            <p>Qty: {c.quantity}</p>
          </li>
        ))}
      </ul>

      <h2>
      
      </h2>
    </div>
  )
}

export default Cart