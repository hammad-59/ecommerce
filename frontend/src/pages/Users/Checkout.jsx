import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  codCheckout,
  stripeCheckout,
  confirmPayment,
} from "../../store/reducers/orderSlice";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Modal from "../../components/Modal";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const [userAddress, setUserAddress] = useState({
    fullName: "",
    phone: "",
    city: "",
    location: "",
    paymentMethod: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // 🟢 COD FLOW
    if (userAddress.paymentMethod === "COD") {
      await dispatch(codCheckout(userAddress));
      setMessage("COD order placed...");
      setShow(true);
    }

    // 🔵 STRIPE FLOW
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
          }),
        );

        setMessage("Payment Received Successfully...");
        setShow(true);
      }
    }
  };

  return (
    <>
      {show && (
        <Modal onClose={() => setShow(false)}>
          <p>{message}</p>
        </Modal>
      )}
      <form onSubmit={handleOnSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={userAddress.fullName}
          onChange={handleInputChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={userAddress.phone}
          onChange={handleInputChange}
        />

        <input
          name="city"
          placeholder="City"
          value={userAddress.city}
          onChange={handleInputChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={userAddress.location}
          onChange={handleInputChange}
        />

        <select
          name="paymentMethod"
          value={userAddress.paymentMethod}
          onChange={handleInputChange}
        >
          <option value="">Select Payment</option>
          <option value="COD">COD</option>
          <option value="Stripe">Stripe</option>
        </select>

        {userAddress.paymentMethod === "Stripe" && <CardElement />}

        <button type="submit">Place Order</button>
      </form>
    </>
  );
};

export default Checkout;
