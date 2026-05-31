import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosInstance"

export const totalRevenueAnalytics = createAsyncThunk(
  "/analytics/totalRevenueAnalytics",
  async (_ , { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/analytics/totalRevenueAnalytics")
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)


export const orderAnalytics = createAsyncThunk(
  "/analytics/orderAnalytics",
  async (_ , { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/analytics/orderAnalytics")
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)


export const topSellingProducts = createAsyncThunk(
  "/analytics/topSellingProducts",
  async (_ , { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/analytics/topSellingProducts")
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

const analyticSlice = createSlice({
  name: "analytics",
  initialState: {
    totalRevenue: 0,
    topSales: [],
    statusOfOrders: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

   
    builder

      .addCase(totalRevenueAnalytics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(totalRevenueAnalytics.fulfilled, (state, action) => {
        state.loading = false
        state.totalRevenue = action.payload.data
      })
      .addCase(totalRevenueAnalytics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })



      .addCase(orderAnalytics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(orderAnalytics.fulfilled, (state, action) => {
        state.loading = false
        state.statusOfOrders = action.payload.data
      })
      .addCase(orderAnalytics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      .addCase(topSellingProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(topSellingProducts.fulfilled, (state, action) => {
        state.loading = false
        state.topSales = action.payload.data
      })
      .addCase(topSellingProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

  }
})

export default analyticSlice.reducer