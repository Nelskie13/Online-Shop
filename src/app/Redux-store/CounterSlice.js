import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("countersState")) || {};

const countersSlice = createSlice({
  name: "counters",
  initialState,
  reducers: {
    increment: (state, action) => {
      const { id } = action.payload;
      state[id] = (state[id] || 1) + 1;
      localStorage.setItem("countersState", JSON.stringify(state));
    },
    decrement: (state, action) => {
      const { id } = action.payload;
      state[id] = (state[id] || 1) - 1;
      localStorage.setItem("countersState", JSON.stringify(state));
    },
    reset: (state, action) => {
      const { id } = action.payload;
      state[id] = 0;
      localStorage.setItem("countersState", JSON.stringify(state));
    },
    resetCounter: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = 0;
      });
      localStorage.setItem("countersState", JSON.stringify(state));
    },
  },
});

export const { increment, decrement, reset, resetCounter } =
  countersSlice.actions;
export default countersSlice.reducer;
