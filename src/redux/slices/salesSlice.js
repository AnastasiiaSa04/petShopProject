import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchSales = createAsyncThunk("sales/fetchSales", async () => {
  const response = await axios.get("http://localhost:3333/products/all");
  return response.data;
});

const salesSlice = createSlice({
  name: "sales",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSales.fulfilled, (state, action) => action.payload);
  },
});

export default salesSlice.reducer;