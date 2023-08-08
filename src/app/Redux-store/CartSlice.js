import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, count } = action.payload;
      const existingItem = state.data.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += count;
      } else {
        state.data.push({ ...product, quantity: count });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.data = state.data.filter((item) => item.id !== productId);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
