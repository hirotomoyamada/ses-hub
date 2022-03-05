import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "libs/firebase";
import { httpsCallable, HttpsCallable } from "firebase/functions";

import { Plan, Option } from "types/pay";

interface FetchProducts {
  products: {
    plan: Plan | null;
    option: Option | null;
  };
  tax: number;
}

export const fetchProducts = createAsyncThunk(
  "pay/fetchProducts",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_org: unknown): Promise<FetchProducts> => {
    const fetchProducts: HttpsCallable<unknown, FetchProducts> = httpsCallable(
      functions,
      "sh-fetchProducts"
    );

    const { data } = await fetchProducts();

    return data;
  }
);
