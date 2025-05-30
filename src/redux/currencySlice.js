import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBaseCurrency,
  fetchExchangeInfo,
  fetchLatestSymbols,
} from './operations';

const initialState = {
  baseCurrency: '',
  isLoading: false,
  error: null,
  exchangeInfo: null,
  rates: [],
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBaseCurrency.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBaseCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.baseCurrency = action.payload;
        state.error = null;
      })
      .addCase(fetchBaseCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchExchangeInfo.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExchangeInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exchangeInfo = action.payload;
        state.error = null;
      })
      .addCase(fetchExchangeInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.exchangeInfo = null;
      })
      .addCase(fetchLatestSymbols.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLatestSymbols.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rates = action.payload;
        state.error = null;
      })
      .addCase(fetchLatestSymbols.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.rates = [];
      });
  },
});

export const { setBaseCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
