import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";



const totalRevenueAnalytics = asyncHandler (async (req, res) => {
    const orders = await Order.find()

    if (!orders) {
        throw new ApiError(404, "no orders found")
    }

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)

        return res.status(200).json(
            new ApiResponse(
                200,
                totalRevenue,
                "total revenue fetched"
            )
        )
})



const orderAnalytics = asyncHandler (async (req, res) => {
    const statusOfOrders = await Order.aggregate([
  {
    $group: {
      _id: null,

      processingOrders: {
        $sum: {
          $cond: [{ $eq: ["$orderStatus", "processing"] }, 1, 0]
        }
      },

      deliveredOrders: {
        $sum: {
          $cond: [{ $eq: ["$orderStatus", "delivered"] }, 1, 0]
        }
      },

      shippedOrders: {
        $sum: {
          $cond: [{ $eq: ["$orderStatus", "shipped"] }, 1, 0]
        }
      },

      cancelledOrders: {
        $sum: {
          $cond: [{ $eq: ["$orderStatus", "cancelled"] }, 1, 0]
        }
      }
    }
  }
])


return res.status(200).json(
  new ApiResponse(200, statusOfOrders,
    "Order analytics fetched"
  )
)

})


const topSellingProductsAnalytics = asyncHandler(async (req, res) => {
  const topSellingProducts = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        name: {
          $first: "$items.name",
        },
        totalSold: {
          $sum: "$items.quantity",
        },
      },
    },
  ]).sort({ totalSold: -1 }).limit(5);

  res.status(200).json(
      new ApiResponse(200, topSellingProducts, "top selling products fetched")
    );
});

export {
  totalRevenueAnalytics,
  orderAnalytics,
  topSellingProductsAnalytics
}