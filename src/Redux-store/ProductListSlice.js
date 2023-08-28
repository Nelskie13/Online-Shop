import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const products = "/api/ProductListAPI";

export const fetchProductList = createAsyncThunk(
  "productList/fetchProductList",
  async () => {
    const response = await axios.get(products);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "productList",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
