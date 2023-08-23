import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const KEY = process.env.NEXT_PUBLIC_FIXER_API_KEY;

// Action creator to load currencies from localStorage
export const loadCurrenciesFromLocalStorage = createAsyncThunk(
  "currencies/loadFromLocalStorage",
  () => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("currenciesData");
      return JSON.parse(savedData);
    }
  }
);

export const fetchCurrencies = createAsyncThunk(
  "currencies/fetchCurrencies",
  async () => {
    const response = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${KEY}&symbols=USD,EUR,PHP,IDR,AUD&format=1`
    );
    // Save the fetched data to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("currenciesData", JSON.stringify(response.data));
    }
    return response.data;
  }
);

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    data: {},
    loading: false,
    error: null,
    selectedCurrency:
      typeof window !== "undefined"
        ? localStorage.getItem("selectedCurrency") || "USD"
        : "USD",
  },
  reducers: {
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(loadCurrenciesFromLocalStorage.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { setSelectedCurrency } = currenciesSlice.actions;

export default currenciesSlice.reducer;
