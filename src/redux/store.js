import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice.js";
import categoryReducer from "./slices/categorySlice.js";
import productReducer from "./slices/productSlice.js";
import saleReducer from "./slices/salesSlice.js"

const store = configureStore({
  reducer: {
    cart: basketReducer,
    categories: categoryReducer,
    products: productReducer,
    sale: saleReducer
  },
});

export default store;