import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const fetchProducts = createAsyncThunk("pay/fetchProducts", async () => {
  const fetchProducts = functions.httpsCallable("sh-fetchProducts");

  const products = await fetchProducts()
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      return { error: "ページを更新してください" };
    });

  return products;
});
