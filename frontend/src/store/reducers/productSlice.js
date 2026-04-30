import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const createProduct = createAsyncThunk(
  "products/createProducts",
  async (newProduct, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/products/createProduct", newProduct);
      return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
  },
);


export const getProducts = createAsyncThunk ("products/getProducts", async ({ page, limit, search, category, subCategory, gender} ,{rejectWithValue}) => {
           try {
      const res = await axiosInstance.get(`/products/getProducts?page=${page}&limit=${limit}&search=${search}&category=${category}&subCategory=${subCategory}&gender=${gender?.join(",") || ""}`);
      return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


export const getProductMeta = createAsyncThunk("products/getProductMeta", async(_ , {rejectWithValue}) => {
    try {
        const res = await axiosInstance.get("/products/getProductMeta")
        return res.data    
    } catch (error) {   
        return rejectWithValue(error.response?.data || error.message)
    }
})


export const getSingleProduct = createAsyncThunk("products/getSingleProduct", async(id, {rejectWithValue}) => {
    try {
        const res = await axiosInstance.get(`/products/getSingleProduct/${id}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})


export const editSingleProduct = createAsyncThunk("products/editSingleProduct", async({id, editProduct}, {rejectWithValue}) => {
    try {
           const res = await axiosInstance.put(`/products/editSingleProduct/${id}`, editProduct) 
           return res.data
    } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
    }
})

export const editProductImage = createAsyncThunk(
  "products/editProductImage",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/products/editProductImage/${id}`,
        formData,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


export const deleteSingleProduct = createAsyncThunk("products/deleteSingleProduct", async(id, {rejectWithValue}) => {
  try {
      await axiosInstance.delete(`/products/deleteSingleProduct/${id}`)
     return id
  } catch (error) {
     return rejectWithValue(error.response?.data || error.message);
  }
})


const productSlice = createSlice({
    name: "products",
    initialState: {
    productItems : [],
    page: 1,
    totalPages: 1,
    total: 0,
    loading: false,
    meta: null,
    selectedProduct: null,
    error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder

          .addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
          })

          .addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.productItems.unshift(action.payload?.data || action.payload);
          })

          .addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.payload;
          })

          .addCase(getProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
          })

          .addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.productItems =
              action.payload?.data.products || action.payload.products;
            state.page = action.payload?.data.page || action.payload.page;
            state.totalPages =
              action.payload?.data.totalPages || action.payload.totalPages;
            state.total = action.payload?.data.total || action.payload.total;
          })

          .addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.payload;
          })

          .addCase(getProductMeta.pending, (state) => {
            state.loading = true;
            state.error = null;
          })

          .addCase(getProductMeta.fulfilled, (state, action) => {
            state.loading = false;
            state.meta = action.payload.data || action.payload;
            state.error = null;
          })

          .addCase(getProductMeta.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.payload;
          })

          //single products

          .addCase(getSingleProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
          })

          .addCase(getSingleProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload.data
          })

          .addCase(getSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.payload;
          })

          //edit products

          .addCase(editSingleProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
          })

          .addCase(editSingleProduct.fulfilled, (state, action) => {
            state.loading = false;
            const updatedProduct = action.payload.data || action.payload;
            state.selectedProduct = updatedProduct;
            const index = state.productItems.findIndex(
              (product) => product._id === updatedProduct._id,
            );

            if (index !== -1) {
              state.productItems[index] = updatedProduct;
            }
          })

          .addCase(editSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.payload;
          })

          //Edit Images

          .addCase(editProductImage.pending, (state) => {
            state.loading = true;
            state.error = null;
          })

          .addCase(editProductImage.fulfilled, (state, action) => {
            state.loading = false;
            const updatedProduct = action.payload.data || action.payload;
            state.selectedProduct = updatedProduct;
            // Update productItems array
            state.productItems = state.productItems.map((p) =>
              p._id === updatedProduct._id ? updatedProduct : p
            );
          })

          .addCase(editProductImage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.payload;
          })


          //Delete Product
          .addCase(deleteSingleProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
          })

          .addCase(deleteSingleProduct.fulfilled, (state, action) => {
            state.loading = false;
            const updatedProduct = action.payload.data || action.payload;
            state.productItems = state.productItems.filter((p) => p._id !== updatedProduct)
          })

          .addCase(deleteSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.payload
          })
          }
})


export default productSlice.reducer;