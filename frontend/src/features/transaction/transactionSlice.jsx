import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async ({ token, page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/transactions?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && Array.isArray(response.data.data)) {
        // calculate totals
        const totalTransactions = response.data.total;
        const totalOrderAmount = response.data.data.reduce(
          (sum, tx) => sum + (tx.order_amount || 0),
          0
        );
        const totalTransactionAmount = response.data.data.reduce(
          (sum, tx) => sum + (tx.transaction_amount || tx.order_amount || 0),
          0
        );

        return {
          totalTransactions,
          totalOrderAmount,
          totalTransactionAmount,
          data: response.data.data,
          page: response.data.page,
          limit: response.data.limit,
        };
      } else {
        return rejectWithValue("Invalid response format");
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    data: [],
    totalTransactions: 0,
    totalOrderAmount: 0,
    totalTransactionAmount: 0,
    page: 1,
    limit: 15,
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {
    clearTransactions: (state) => {
      state.data = [];
      state.totalTransactions = 0;
      state.totalOrderAmount = 0;
      state.totalTransactionAmount = 0;
      state.page = 1;
      state.limit = 5;
      state.error = null;
      state.fetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalTransactions = action.payload.totalTransactions;
        state.totalOrderAmount = action.payload.totalOrderAmount;
        state.totalTransactionAmount = action.payload.totalTransactionAmount;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.fetched = true;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
