"use client";

import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./ProductListSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
});

// Export only the required functions, not the whole store object
export const getStoreState = () => store.getState();
export const dispatchAction = (action) => store.dispatch(action);

// Export the store itself (optional, in case you need to access it directly)
export default store;
