import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState, State } from "features/pay/initialState";

import * as actions from "features/pay/actions";
import { Products } from "types/pay";

export const paySlice = createSlice({
  name: "pay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.fetchProducts.fulfilled, (state, action) => {
      (state.products as Products).plan = action.payload.products.plan;
      (state.products as Products).option = action.payload.products.option;
      state.tax = action.payload.tax;
    });
  },
});

export const products = (state: RootState): Products =>
  state.pay.products as Products;
export const tax = (state: RootState): State["tax"] => state.pay.tax;

export default paySlice.reducer;
