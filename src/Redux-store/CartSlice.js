"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload; // Complete product object including id and quantity
      if (!state.cartItems.some((item) => item.id === product.id)) {
        state.cartItems.push(product);
        saveToLocalStorage(state.cartItems);
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
      saveToLocalStorage(state.cartItems);
    },
    resetCart: (state) => {
      state.cartItems = [];
      removeFromLocalStorage();
    },
  },
});

const saveToLocalStorage = (cartItems) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  }
};

const removeFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cartData");
  }
};

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
