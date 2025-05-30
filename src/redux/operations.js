import { createAsyncThunk } from '@reduxjs/toolkit';
import { exchangeCurrency, latestRates } from '../service/exchangeAPI';
import { getUserInfo } from '../service/opencagedataApi';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrency',
  async (coords, thunkApi) => {
    const state = thunkApi.getState();
    const { baseCurrency } = state.currency;
    if (baseCurrency) {
      return baseCurrency;
    }
    try {
      const data = await getUserInfo(coords);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeInfo = createAsyncThunk(
  'currency/fetchExchangeInfo',
  async (cred, thunkApi) => {
    try {
      const data = await exchangeCurrency(cred);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchLatestSymbols = createAsyncThunk(
  'currency/fetchLatestSymbols',
  async (baseCurrency, thunkApi) => {
    try {
      const data = await latestRates(baseCurrency);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
