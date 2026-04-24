import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";

const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty = 1 } = req.body;

  if (!productId) {
    throw new ApiError(400, "product field is required");
  }

  if (qty < 1) {
    throw new ApiError(400, "quantity must be atleast 1");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "product not found");
  }

  let cart = await Cart.findOneAndUpdate(
    { user: req.user._id, "items.product": productId },
    { $inc: { "items.$.quantity": qty } },
    { new: true }
  );

  if (!cart) {
    cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $push: { items: { product: productId, quantity: qty } } },
      { new: true, upsert: true }
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart Added Successfully"));
});



export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product"); 

  if (!cart) {
    return res
      .status(200)
      .json(new ApiResponse(200, { items: [] }, "Cart is empty"));
  }

  const total = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return res.status(200).json(
    new ApiResponse(200, { cart, total }, "Cart fetched successfully")
  );
});

export { 
    addToCart,
    getCart

 };
