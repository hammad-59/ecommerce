import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosInstance"

// 🟢 COD
export const codCheckout = createAsyncThunk(
  "/order/codCheckout",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/order/codCheckout", orderData)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// 🔵 STRIPE INIT
export const stripeCheckout = createAsyncThunk(
  "/order/stripeCheckout",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/order/stripeCheckout", orderData)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// 🟣 CONFIRM PAYMENT
export const confirmPayment = createAsyncThunk(
  "/order/confirmPayment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/order/confirmPayment", data)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// 📦 ADMIN VIEW ORDERS
export const adminViewOrders = createAsyncThunk(
  "/order/adminViewOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/order/adminViewOrders")
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// ✏️ STATUS UPDATE
export const changingStatus = createAsyncThunk(
  "/order/changingStatus",
  async ({ id, orderStatus, paymentStatus }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/order/changingStatus/${id}`,
        { orderStatus, paymentStatus }
      )
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// 👤 USER TRACKING ORDERS
export const userTrackingOrder = createAsyncThunk(
  "/order/userTrackingOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/order/userTrackingOrder")
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
    userOrders: [],
    orderItems: null,
    stripeData: null,
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    // ================= COD =================
    builder
      .addCase(codCheckout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(codCheckout.fulfilled, (state, action) => {
        state.loading = false
        state.orderItems = action.payload.data
      })
      .addCase(codCheckout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ================= STRIPE =================
      .addCase(stripeCheckout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(stripeCheckout.fulfilled, (state, action) => {
        state.loading = false
        state.stripeData = action.payload.data
      })
      .addCase(stripeCheckout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ================= CONFIRM PAYMENT =================
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.loading = false
        state.orderItems = action.payload.data
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ================= ADMIN ORDERS =================
      .addCase(adminViewOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(adminViewOrders.fulfilled, (state, action) => {
        state.loading = false
        state.allOrders = action.payload.data
      })
      .addCase(adminViewOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ================= STATUS UPDATE =================
      .addCase(changingStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(changingStatus.fulfilled, (state, action) => {
        state.loading = false

        const updatedOrder = action.payload.data

        state.allOrders = state.allOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      })
      .addCase(changingStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ================= USER ORDERS =================
      .addCase(userTrackingOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userTrackingOrder.fulfilled, (state, action) => {
        state.loading = false
        state.userOrders = action.payload.data
      })
      .addCase(userTrackingOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default orderSlice.reducer