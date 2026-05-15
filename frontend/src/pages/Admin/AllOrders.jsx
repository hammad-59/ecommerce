import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminViewOrders, changingStatus } from '../../store/reducers/orderSlice'

const AllOrders = () => {

    const { allOrders } = useSelector(state => state.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(adminViewOrders())
    }, [])

    const handleStatusChange = (order, status) => {

        if (order.payment.method === "Stripe") {

            dispatch(
                changingStatus({
                    id: order._id,
                    orderStatus: status,
                    paymentStatus: status === "delivered" ? "paid" : order.payment.status
                })
            )

        } else {

            dispatch(
                changingStatus({
                    id: order._id,
                    orderStatus: status,
                    paymentStatus: status === "delivered" ? "paid" : "pending"
                })
            )
        }
    }

    return (
        <ul>

            {allOrders?.map((order) => (
                <li key={order._id} style={{ marginBottom: "20px" }}>

                    <p>Name: {order.address.fullName}</p>
                    <p>Phone: {order.address.phone}</p>
                    <p>City: {order.address.city}</p>
                    <p>Location: {order.address.location}</p>

                    <p>Order Status: {order.orderStatus}</p>
                    <p>Payment Status: {order.payment.status}</p>

                    {order.items?.map((item) => (
                        <div key={item._id}>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.quantity}</p>
                        </div>
                    ))}

                    {order.orderStatus !== "delivered" && (
                        <div>
                            <button onClick={() => handleStatusChange(order, "processing")}>
                                Processing
                            </button>

                            <button onClick={() => handleStatusChange(order, "shipped")}>
                                Shipped
                            </button>

                            <button onClick={() => handleStatusChange(order, "delivered")}>
                                Delivered
                            </button>
                        </div>
                    )}

                </li>
            ))}

        </ul>
    )
}

export default AllOrders