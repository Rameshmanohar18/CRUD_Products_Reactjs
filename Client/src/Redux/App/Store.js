import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "../../Features/Categories/CategorySlice"
import productReducer from "../../Features/Products/ProductSlice"
import authReducer from "../../Features/Auth/authSlice"

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    auth: authReducer
  }
})