import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminViewOrders,
  changingStatus,
} from "../../store/reducers/orderSlice";
import PageLoader from "../../components/PageLoader";

const AllOrders = () => {
  const { allOrders, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminViewOrders());
  }, []);

  const handleStatusChange = (order, status) => {
    if (order.payment.method === "Stripe") {
      dispatch(
        changingStatus({
          id: order._id,
          orderStatus: status,
          paymentStatus: status === "delivered" ? "paid" : order.payment.status,
        }),
      );
    } else {
      dispatch(
        changingStatus({
          id: order._id,
          orderStatus: status,
          paymentStatus: status === "delivered" ? "paid" : "pending",
        }),
      );
    }
  };

  if (loading) return <PageLoader />;

  if (allOrders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white shadow-md rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-700">No Orders Found</h2>

          <p className="text-gray-500 mt-2">
            Orders will appear here once customers place them.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl m-5 text-center bg-blue-400 text-white p-5 rounded-md font-bold">
        Track ALL Orders
      </h1>

      <ul>
        {allOrders?.map((order) => (
          <li key={order._id}>
            <section className="bg-white shadow-lg rounded-2xl p-5 md:p-7 border border-gray-200">
              {/* top */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {order.address.fullName}
                  </h2>

                  <p className="text-sm text-gray-500">{order.address.city}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {order.payment.method}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.payment.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.payment.status}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.orderStatus === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* middle */}
              <div className="grid md:grid-cols-2 gap-6 mt-5">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700">
                    Shipping Details
                  </h3>

                  <p className="text-gray-600">Phone: {order.address.phone}</p>

                  <p className="text-gray-600">
                    Address: {order.address.location}
                  </p>

                  <p className="font-bold text-lg text-black mt-3">
                    Total: Rs: {order.totalAmount}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Ordered Items
                  </h3>

                  <div className="space-y-3">
                    {order.items?.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold">${item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* buttons */}
              {order.orderStatus !== "delivered" && (
                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => handleStatusChange(order, "processing")}
                  >
                    Processing
                  </button>

                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => handleStatusChange(order, "shipped")}
                  >
                    Shipped
                  </button>

                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => handleStatusChange(order, "delivered")}
                  >
                    Delivered
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => handleStatusChange(order, "cancelled")}
                  >
                    Cancelled
                  </button>
                </div>
              )}
            </section>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllOrders;
