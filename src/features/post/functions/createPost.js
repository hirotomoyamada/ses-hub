import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const createPost = createAsyncThunk("post/createPost", async (data) => {
  const createPost = functions.httpsCallable("sh-createPost");
  const sendPost = functions.httpsCallable("sh-sendPost");

  const post = createPost({
    index: data.index,
    post: data.post,
  })
    .then(({ data }) => {
      sendPost({ index: data.index, post: data.post }).catch((e) => {});

      return {
        index: data.index,
        post: data.post,
      };
    })
    .catch((e) => {});
  return post;
});
