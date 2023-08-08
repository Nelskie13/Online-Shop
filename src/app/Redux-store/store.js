import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./ProductListSlice";
import productDetailsReducer from "./ProductDetailsSlice";
import cartSliceReducer from "./CartSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartSliceReducer,
  },
});

// Export only the required functions, not the whole store object
export const getStoreState = () => store.getState();
export const dispatchAction = (action) => store.dispatch(action);

// Export the store itself (optional, in case you need to access it directly)
export default store;
