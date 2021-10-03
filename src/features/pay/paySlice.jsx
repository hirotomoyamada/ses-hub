import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { functions } from "../../firebase";

// stateの初期値
const initialState = {
  products: {},
  tax: 0,
};

export const fetchProducts = createAsyncThunk(
  "user/fetchProducts",
  async () => {
    const fetchProducts = functions.httpsCallable("sh-fetchProducts");

    const products = fetchProducts().then(({ data }) => {
      return data;
    });

    return products;
  }
);

export const paySlice = createSlice({
  name: "pay",
  initialState,

  // reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.tax = action.payload.tax;
    });
  },
});

// export const {} = paySlice.actions;

export const products = (state) => state.pay.products;
export const tax = (state) => state.pay.tax;

export default paySlice.reducer;
