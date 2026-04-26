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

  const cartLength = cart.items.length

  return res
    .status(200)
    .json(new ApiResponse(200, {cart, cartLength}, "Cart Added Successfully"));
});



 const getCart = asyncHandler(async (req, res) => {
 
    const userId = req.user?._id

    const cart = await Cart.findOne({user:userId}).populate({
      path: "items.product",
      select: "name price images"
    })
       if (!cart) {
    return res
      .status(200)
      .json(new ApiResponse(200, { items: [] }, "Cart is empty"));
  }

  const total = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

    const cartLength = cart.items.length

  return res.status(200).json(
    new ApiResponse(200, { cart, total, cartLength }, "Cart fetched successfully")
  );
})



  const cartQuantity = asyncHandler(async (req, res) => {
  const { productId, qty } = req.body;

  const parsedQty = Number(qty);
  const userId = req.user?._id;

  if (!productId) {
    throw new ApiError(400, "productId is required");
  }

  if (isNaN(parsedQty)) {
    throw new ApiError(400, "quantity should be a valid number");
  }

  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    select: "name price images stock"
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find(
    (i) => i.product._id.toString() === productId
  );

  if (!item) {
    throw new ApiError(404, "Product not in cart");
  }

  item.quantity += parsedQty;

  await cart.save();

  const total = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);  

  return res.status(200).json(
    new ApiResponse(200, { cart, total }, "quantity updated")
  );
});

export { 
    addToCart,
    getCart,
    cartQuantity

 };
