import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userTrackingOrder } from '../../store/reducers/orderSlice'

const UserOrders = () => {

    const {userOrders} = useSelector(state => state.orders)

    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(userTrackingOrder())
    }, [dispatch])
  return (
    <div>
      <ul>{
            userOrders?.map((order) => {
                return(
                    <li key={order._id}>
                         <p>Name: {order.address.fullName}</p>
                    <p>Phone: {order.address.phone}</p>
                        <p>{order.payment.status}</p>
                    </li>
                )
            })
        
        }</ul>
    </div>
  )
}

export default UserOrders
