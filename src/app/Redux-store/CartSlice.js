import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload; // Complete product object including id and quantity
      if (!state.cartItems.some((item) => item.id === product.id)) {
        state.cartItems.push(product);
      }
      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== product);
      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
    },
    resetCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartData");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
