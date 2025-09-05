import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromBasket: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    clearBasket: () => {
      return [];
    },
  },
});

export const { addTobasket, removeFromBasket, clearBasket } = basketSlice.actions;


export default basketSlice.reducer;