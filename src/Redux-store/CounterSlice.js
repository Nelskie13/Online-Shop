"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("countersState")) || {}
    : {};

const countersSlice = createSlice({
  name: "counters",
  initialState,
  reducers: {
    increment: (state, action) => {
      const { id } = action.payload;
      state[id] = (state[id] || 1) + 1;
      saveToLocalStorage(state);
    },
    decrement: (state, action) => {
      const { id } = action.payload;
      state[id] = (state[id] || 1) - 1;
      saveToLocalStorage(state);
    },
    reset: (state, action) => {
      const { id } = action.payload;
      state[id] = 0;
      saveToLocalStorage(state);
    },
    resetCounter: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = 0;
      });
      saveToLocalStorage(state);
    },
  },
});

const saveToLocalStorage = (countersState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("countersState", JSON.stringify(countersState));
  }
};

export const { increment, decrement, reset, resetCounter } =
  countersSlice.actions;

export default countersSlice.reducer;
