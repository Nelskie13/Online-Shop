import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("countersState")) || {};

const countersSlice = createSlice({
  name: "counters",
  initialState,
  reducers: {
    increment: (state, action) => {
      const { id } = action.payload;
      state[id] = (state[id] || 0) + 1;
      localStorage.setItem("countersState", JSON.stringify(state));
    },
    decrement: (state, action) => {
      const { id } = action.payload;
      state[id] = (state[id] || 0) - 1;
      localStorage.setItem("countersState", JSON.stringify(state));
    },
    reset: (state, action) => {
      const { id } = action.payload;
      state[id] = 0;
      localStorage.setItem("countersState", JSON.stringify(state));
    },
  },
});

export const { increment, decrement, reset } = countersSlice.actions;
export default countersSlice.reducer;
