import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  codCheckout,
  stripeCheckout,
  confirmPayment,
} from "../../store/reducers/orderSlice";

import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

import Modal from "../../components/Modal";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const [userAddress, setUserAddress] = useState({
    fullName: "",
    phone: "",
    city: "",
    location: "",
    paymentMethod: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // COD FLOW
    if (userAddress.paymentMethod === "COD") {
      await dispatch(codCheckout(userAddress));

      setMessage("COD Order Placed Successfully");
      setShow(true);
    }

    // STRIPE FLOW
    if (userAddress.paymentMethod === "Stripe") {
      const res = await dispatch(stripeCheckout(userAddress));

      const { clientSecret, orderId } = res.payload.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.paymentIntent?.status === "succeeded") {
        await dispatch(
          confirmPayment({
            orderId,
            transactionId: result.paymentIntent.id,
          })
        );

        setMessage("Payment Received Successfully");
        setShow(true);
      }
    }
  };

  return (
    <>
      {show && (
        <Modal onClose={() => setShow(false)}>
          <p className="text-center text-lg font-semibold">
            {message}
          </p>
        </Modal>
      )}

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleOnSubmit}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2"
        >
          {/* LEFT SIDE */}
          <div className="bg-black text-white p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-3">
                Checkout
              </h1>

              <p className="text-gray-300 leading-7">
                Complete your order securely using
                Cash on Delivery or Stripe Payment.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <div className="border border-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-400">
                  Secure Payment
                </p>

                <h2 className="font-semibold mt-1">
                  Stripe Integration
                </h2>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-400">
                  Delivery Support
                </p>

                <h2 className="font-semibold mt-1">
                  Fast & Reliable Shipping
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">
              Shipping Details
            </h2>

            <div className="grid grid-cols-1 gap-5">
              {/* FULL NAME */}
              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={userAddress.fullName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block mb-2 font-medium">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="03xx-xxxxxxx"
                  value={userAddress.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* CITY */}
              <div>
                <label className="block mb-2 font-medium">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={userAddress.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label className="block mb-2 font-medium">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Street / Area / House no"
                  value={userAddress.location}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* PAYMENT METHOD */}
              <div>
                <label className="block mb-2 font-medium">
                  Payment Method
                </label>

                <select
                  name="paymentMethod"
                  value={userAddress.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                >
                  <option value="">
                    Select Payment Method
                  </option>

                  <option value="COD">
                    Cash On Delivery
                  </option>

                  <option value="Stripe">
                    Stripe Payment
                  </option>
                </select>
              </div>

              {/* STRIPE CARD */}
              {userAddress.paymentMethod === "Stripe" && (
                <div>
                  <label className="block mb-2 font-medium">
                    Card Details
                  </label>

                  <div className="border border-gray-300 rounded-lg px-4 py-4 bg-white">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#ef4444",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 mt-2"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;