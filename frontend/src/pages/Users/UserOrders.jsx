import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userTrackingOrder } from "../../store/reducers/orderSlice";
import PageLoader from "../../components/PageLoader";

const UserOrders = () => {
  const { userOrders, loading } = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userTrackingOrder());
  }, [dispatch]);

  if (loading) return <PageLoader />;

  if (userOrders?.length === 0) {
    return (
      <div className="text-center my-10 text-gray-500 font-semibold">
        No orders found
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-xl font-bold bg-blue-400 p-6 text-white text-center my-8 w-full">
          Track Your Order
        </h1>
      </div>
      <section className="flex justify-center">
        <ul>
          {userOrders?.map((order) => {
            return (
              <li key={order._id}>
                <div className="m-7 p-8 md:m-8 md:p-10 w-full max-w-4xl bg-gray-50 rounded-2xl shadow-lg font-bold">
                  <ul>
                    {order?.items?.map((c) => {
                      return (
                        <li key={c.product._id}>
                          <div className="grid md:grid-cols-2">
                            <p className="my-2">
                              Product:{" "}
                              <span className="text-blue-700 md:text-lg">
                                {c.product.name}
                              </span>
                            </p>
                            <p className="my-1">Quantity: {c.quantity}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="grid md:grid-cols-2 gap-3 my-2">
                    <p>
                      Payment status:{" "}
                      <span
                        className={
                          order.payment.status === "paid"
                            ? "text-green-700 font-bold"
                            : "text-red-600 font-bold"
                        }
                      >
                        {order.payment.status}
                      </span>
                    </p>

                    <p>
                      Order status:{" "}
                      <span
                        className={
                          order.orderStatus === "delivered"
                            ? "text-green-700 font-bold"
                            : "text-red-600 font-bold"
                        }
                      >
                        {order.orderStatus}
                      </span>
                    </p>

                    <p>
                      Total Amount:{" "}
                      <span className="text-green-600 text-md">
                        {order.totalAmount}
                      </span>
                    </p>
                    <p>
                      Ordered At:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default UserOrders;
