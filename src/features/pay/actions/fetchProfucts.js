import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const fetchProducts = createAsyncThunk("pay/fetchProducts", async () => {
  const fetchProducts = functions.httpsCallable("sh-fetchProducts");

  const products = fetchProducts().then(({ data }) => {
    return data;
  });

  return products;
});
