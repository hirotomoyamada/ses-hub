import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const fetchUser = createAsyncThunk("user/fetchUser", async (data) => {
  const fetchUser = functions.httpsCallable("sh-fetchUser");

  const user = await fetchUser({
    index: data.index,
    uid: data.uid,
    uids: data.uids,
  }).then(({ data }) => {
    return {
      user: data.user,
      bests: data.bests.length && data.bests.filter((user) => user),
    };
  });

  return user;
});
