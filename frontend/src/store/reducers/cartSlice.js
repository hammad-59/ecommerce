import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";


export const addToCart  = createAsyncThunk("/cart/addcart", async({id, qty}, {rejectWithValue}) => {
   try {
         const res = await axiosInstance.put("/cart/addcart", {productId:id, qty})
         return res.data
   } catch (error) {
          return rejectWithValue(error.response?.data || error.message);
   }
})

export const getCart  = createAsyncThunk("/cart/getCart", async(_, {rejectWithValue}) => {
   try {
         const res = await axiosInstance.get("/cart/getCart")
         return res.data
   } catch (error) {
          return rejectWithValue(error.response?.data || error.message);
   }
})

export const cartQuantity  = createAsyncThunk("/cart/cartQuantity", async( {productId, qty}, {rejectWithValue}) => {
   try {
         const res = await axiosInstance.put("/cart/cartQuantity", {productId, qty})
         return res.data
   } catch (error) {
          return rejectWithValue(error.response?.data || error.message);
   }
})




const cartSlice = createSlice({
    name: "carts",
    initialState: {
    cartItems: [],
    totalPrice: 0,
    loading: false,
    error: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder

        .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload.data.cart
            state.error = null
        })

        .addCase(addToCart.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload.message
        })


        .addCase(getCart.pending, (state) => {
            state.loading = true
            state.error = null
        })

        .addCase(getCart.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload.data.cart
            state.totalPrice = action.payload.data.total
            state.error = null
        })

        .addCase(getCart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })

        .addCase(cartQuantity.pending, (state) => {
            state.loading = true
            state.error = null
        })

    
        .addCase(cartQuantity.fulfilled, (state, action) => {
            state.loading = false
          state.cartItems = action.payload.data.cart
            state.totalPrice = action.payload.data.total
        })
        .addCase(cartQuantity.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
    }
   
})

export default cartSlice.reducer;