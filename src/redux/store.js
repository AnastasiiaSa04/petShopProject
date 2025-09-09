import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";

const store = configureStore({
  reducer: {
    cart: basketReducer,
    categories: categoryReducer,
    products: productReducer,
  },
});

export default store;