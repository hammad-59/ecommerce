import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    price: Number,
    quantity: Number,
  },
],

  totalAmount: {
    type: Number,
    required: true,
  },

  address: {

    fullName: {
     type: String,
     required: true, 
    },

     phone: {
      type: String,
      required: true
     },


     city: {
      type: String,
      required: true, 
     },

     location: {
      type: String,
      required: true, 
     },

  },

  payment: {
    method: {
      type: String,
      enum: ["COD", "Stripe"],
      default: "COD",
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    transactionId: String,
    paidAt: Date,
  },

  orderStatus: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled"],
    default: "processing",
  },
}, {timestamps: true});

export const Order = mongoose.model("Order", orderSchema);
