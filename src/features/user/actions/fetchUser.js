import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const fetchUser = createAsyncThunk("user/fetchUser", async (data) => {
  const fetchUser = functions.httpsCallable("sh-fetchUser");
  const user = fetchUser({
    index: data.index,
    uid: data.uid,
  }).then(({ data }) => {
    return {
      user: data.user,
      bests: data.bests.length && data.bests.filter((user) => user),
    };
  });

  return user;
});