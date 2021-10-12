import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const showUser = createAsyncThunk("user/showUser", async (data) => {
  const showUser = functions.httpsCallable("sh-showUser");
  const user = showUser({
    type: data.type,
    uid: data.uid,
  }).then(({ data }) => {
    return { user: data };
  });

  return user;
});
