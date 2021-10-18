import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const fetchUser = createAsyncThunk("user/fetchUser", async (data) => {
  const fetchUser = functions.httpsCallable("sh-fetchUser");
  const user = fetchUser({
    type: data.type,
    uid: data.uid,
  }).then(({ data }) => {
    return { user: data };
  });

  return user;
});
