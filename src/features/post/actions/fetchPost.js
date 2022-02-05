import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const fetchPost = createAsyncThunk("post/fetchPost", async (data) => {
  const fetchPost = functions.httpsCallable("sh-fetchPost");

  const post = await fetchPost({
    index: data.index,
    objectID: data.objectID,
  })
    .then(({ data }) => {
      return {
        post: data.post,
        bests: data.bests.filter((post) => post),
      };
    })
    .catch((e) => {
      return { error: e.details };
    });

  return post;
});
