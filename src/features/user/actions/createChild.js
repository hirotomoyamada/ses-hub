import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const createChild = createAsyncThunk(
  "user/createChild",
  async (data) => {
    const createChild = functions.httpsCallable("sh-createChild");

    const res = await createChild(data)
      .then(async ({ data }) => {
        return data;
      })
      .catch((e) => {
        return { error: e.message };
      });

    return res;
  }
);
