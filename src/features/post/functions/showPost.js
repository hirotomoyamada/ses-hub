import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const showPost = createAsyncThunk("post/showPost", async (data) => {
  const showPost = functions.httpsCallable("sh-showPost");
  const res = showPost({
    index: data.index,
    objectID: data.objectID,
  })
    .then(({ data }) => {
      return {
        post: data.post,
        bests: data.bests.filter((post) => post),
      };
    })
    .catch(() => {
      return {
        notFound: true,
      };
    });

  return res;
});
