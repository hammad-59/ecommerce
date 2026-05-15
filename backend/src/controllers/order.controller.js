import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



const codCheckout = asyncHandler(async (req, res) => {

    const { fullName, phone, city, location } = req.body

    if ([fullName, phone, city, location].some(f => !f || f.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const userId = req.user._id

    const cart = await Cart.findOne({ user: userId }).populate("items.product")

    if (!cart || cart.items.length === 0) {
        throw new ApiError(404, "Cart is empty")
    }

    for (const item of cart.items) {
        await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: {
            stock: -item.quantity
        }},
         { new: true }
       )     
    }
    

    const totalAmount = cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity
    }, 0)

    const order = await Order.create({
        user: userId,
        items: cart.items.map(item => ({
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
        })),
        totalAmount,
        address: { fullName, phone, city, location },
        payment: {
            method: "COD",
            status: "pending"
        }
    })



    cart.items = []
    await cart.save()

    return res.status(200).json(
        new ApiResponse(200, order, "COD order created")
    )
})


const stripeCheckout = asyncHandler(async (req, res) => {

    const { fullName, phone, city, location } = req.body

    if ([fullName, phone, city, location].some(f => !f || f.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const userId = req.user._id

    const cart = await Cart.findOne({ user: userId }).populate("items.product")

    if (!cart || cart.items.length === 0) {
        throw new ApiError(404, "Cart is empty")
    }


    for (const item of cart.items) {
        await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: {
            stock: -item.quantity
        }},
         { new: true }
       )   
    }

    const totalAmount = cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity
    }, 0)

    // ✅ Create Order First
    const order = await Order.create({
        user: userId,

        items: cart.items.map(item => ({
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
        })),

        totalAmount,

        address: {
            fullName,
            phone,
            city,
            location
        },

        payment: {
            method: "Stripe",
            status: "pending"
        }
    })

    // ✅ Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: "usd",

        metadata: {
            orderId: order._id.toString(),
            userId: userId.toString()
        }
    })

    return res.status(200).json(
        new ApiResponse(200, {
            clientSecret: paymentIntent.client_secret,
            orderId: order._id
        }, "Stripe payment initiated")
    )
})



const confirmPayment = asyncHandler(async (req, res) => {
  const { orderId, transactionId } = req.body;

  if (!orderId || !transactionId) {
    throw new ApiError(400, "Missing payment data");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.payment.status = "paid";
  order.payment.transactionId = transactionId;
  order.payment.paidAt = new Date();

  await order.save();

  const cart = await Cart.findOne({ user: order.user });

  if (cart) {
    cart.items = [];
    await cart.save();
  }

  return res.status(200).json(
    new ApiResponse(200, order, "Payment confirmed")
  );
});


const adminViewOrders = asyncHandler ( async (req, res) => {

    const {search} = req.query

    const filter = {}

      if (search) {
        filter["address.fullName"] = {
            $regex: search,
            $options: "i"
        }
    }

    const order = await Order.find(filter).populate({path: "items.product",
      select: "name price images"})

    return res.status(200).json( new ApiResponse( 200, order, "All orders fetched"))

})


const changingStatus = asyncHandler(async (req, res) => {

    const { id } = req.params
    const { orderStatus, paymentStatus } = req.body

    const order = await Order.findByIdAndUpdate(
        id,
        {
            $set: {
                "payment.status": paymentStatus,
                orderStatus: orderStatus
            }
        },
        { new: true }
    )

    return res.status(200).json({
        success: true,
        data: order,
        message: "Order status updated"
    })
})



const userTrackingOrder = asyncHandler( async(req, res) => {
    const userId = req.user._id

    const order = await Order.find({user: userId}).populate("items.product")

    return res.status(200).json(
        new ApiResponse(200, order, "order status tracking send")
    )

}) 


export {
    codCheckout,
    stripeCheckout,
    confirmPayment,
    adminViewOrders,
    changingStatus,
    userTrackingOrder
}