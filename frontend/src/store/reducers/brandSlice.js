import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Create brand
export const createBrand = createAsyncThunk(
  "brands/createBrand",
  async (newBrand, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/brands/createBrand", newBrand);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch brands
export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/brands/getBrandDetails");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


//Update Brands
export const updateBrand = createAsyncThunk(
  "brands/updateBrand", async({id, newName}, {rejectWithValue}) => {
    try {
      const res = await axiosInstance.put(`/brands/updateBrand/${id}`, {newName})
         return res.data
    } catch (error) {
         return rejectWithValue(error.response?.data || error.message);    
    }
  }
)


//delete Brands

export const deleteBrand = createAsyncThunk("brands/deleteBrand" ,async (id, {rejectWithValue}) => {
      try {
        await axiosInstance.delete(`brands/deleteBrand/${id}`)
        return id
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
})


const brandSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch brands
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // create brand
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload.data);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Edit Brand
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null
      })

      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false
        const updatedData = action.payload.data
        state.items = state.items.map((item) => item._id === updatedData._id ? updatedData : item)
        state.error = null
      })

      .addCase(updateBrand.rejected, (state, action) => {
         state.loading = false
         state.error = action.payload?.message || action.payload;
      })

      //Delete Brand
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null
      })

      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter((item) => item._id !== action.payload)
        state.error = null
      })

      .addCase(deleteBrand.rejected, (state, action) => {
         state.loading = false
         state.error = action.payload?.message || action.payload;
      })
  },
});

export default brandSlice.reducer;
