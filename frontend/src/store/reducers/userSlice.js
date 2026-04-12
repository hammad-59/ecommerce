import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";


export const signUp  = createAsyncThunk("/users/register", async(newUser, {rejectWithValue}) => {
   try {
         const res = await axiosInstance.post("/users/register", newUser)
         return res.data
   } catch (error) {
          return rejectWithValue(error.response?.data || error.message);
   }
})


export const logginUser = createAsyncThunk("/users/login", async(userLoggedIn, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post("/users/login", userLoggedIn)
            return res.data
        } catch (error) {
             return rejectWithValue(error.response?.data || error.message);
        }
})

export const updateAccountDetails = createAsyncThunk("/users/editProfile", async(dataUpdate, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.put("/users/editProfile", dataUpdate)
            return res.data
        } catch (error) {
             return rejectWithValue(error.response?.data || error.message);
        }
})

export const getCurrentUser = createAsyncThunk("/users/getCurrentUser", async(_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get("/users/getCurrentUser")
            return res.data
        } catch (error) {
             return rejectWithValue(error.response?.data || error.message);
        }
})

export const logoutUser = createAsyncThunk("/users/logout", async (_, {rejectWithValue}) => {
    try {
          const res = await axiosInstance.post("/users/logout")
          return res.data
    } catch (error) {
       return rejectWithValue(error.response?.data || error.message);
    }
})

export const changePassword = createAsyncThunk("/users/changePassword", async (updatePassword, {rejectWithValue}) => {
    try {
          const res = await axiosInstance.put("/users/changePassword", updatePassword)
          return res.data
    } catch (error) {
       return rejectWithValue(error.response?.data || error.message);
    }
})


const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        accessToken: null,
        loading: false,
        error: null,
        isAuthenticated: false
    },
    reducers : {},


    extraReducers: (builder) => {
        builder
         .addCase(signUp.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
         .addCase(signUp.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.data
                    state.isAuthenticated = true
                  })
         .addCase(signUp.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload?.message || action.error.message;
                    state.isAuthenticated = false;
                  })

         .addCase(logginUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
         .addCase(logginUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.data.user;
                    state.accessToken = action.payload.data.accessToken;
                    state.isAuthenticated = true;
                 })
         .addCase(logginUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload?.message || action.error.message;
                    state.isAuthenticated = false;
                  })

         .addCase(updateAccountDetails.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
         .addCase(updateAccountDetails.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.data;
                 })
         .addCase(updateAccountDetails.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload?.message || action.error.message;
                  })

         .addCase(getCurrentUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
         .addCase(getCurrentUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.data;
                 })
         .addCase(getCurrentUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload?.message || action.error.message;
                  })
     
          .addCase(logoutUser.pending, (state) => {
                    state.loading = true;
                    state.error = false
                 })        

          .addCase(logoutUser.fulfilled, (state) => {
                  state.loading = false
                  state.user = null
                  state.isAuthenticated = false
                  state.accessToken = null
          })       
          .addCase(logoutUser.rejected, (state, action) => {
                  state.loading = false
                   state.error = action.payload?.message || action.error.message;
          })       
     
          .addCase(changePassword.pending, (state) => {
                    state.loading = true;
                    state.error = false
                 })        

          .addCase(changePassword.fulfilled, (state, action) => {
                  state.loading = false
          })       
          .addCase(changePassword.rejected, (state, action) => {
                  state.loading = false
                   state.error = action.payload?.message || action.error.message;
          })       
    }


})


export default usersSlice.reducer