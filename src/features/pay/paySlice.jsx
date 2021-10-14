import { createSlice } from "@reduxjs/toolkit";

import { fetchProducts } from "./actions/fetchProfucts";

const initialState = {
  products: {},
  tax: 0,
};

export const paySlice = createSlice({
  name: "pay",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.tax = action.payload.tax;
    });
  },
});

export const products = (state) => state.pay.products;
export const tax = (state) => state.pay.tax;

export default paySlice.reducer;
