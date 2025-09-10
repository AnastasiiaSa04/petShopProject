import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSaleItems = createAsyncThunk(
  "sale/fetchSaleItems",
  async () => {
    const res = await axios.get('http://localhost:3333/products/all'); 
    return res.data.filter(item => item.discont_price && item.discont_price > 0);
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleItems.pending, (state) => { state.status = "loading"; })
      .addCase(fetchSaleItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSaleItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export default saleSlice.reducer;

