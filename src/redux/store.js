import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice"

const store = configureStore({
  reducer: {
    cart: basketReducer,
  },
});

export default store;