import {configureStore} from "@reduxjs/toolkit"
import brandsReducer from "./reducers/brandSlice"
import productReducer from "./reducers/productSlice"
import usersReducer from "./reducers/userSlice"

const store = configureStore({
    reducer: { 
        brands: brandsReducer,
        products: productReducer,
        users: usersReducer
    }
})

export default store