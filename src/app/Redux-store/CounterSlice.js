import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const countersSlice = createSlice({
  name: "counters",
  initialState,
  reducers: {
    increment: (state, action) => {
      const { id } = action.payload;
      state[id] = (state[id] || 0) + 1;
    },
    decrement: (state, action) => {
      const { id } = action.payload;
      state[id] = (state[id] || 0) - 1;
    },
    reset: (state, action) => {
      const { id } = action.payload;
      state[id] = 0;
    },
  },
});

export const { increment, decrement, reset } = countersSlice.actions;
export default countersSlice.reducer;
