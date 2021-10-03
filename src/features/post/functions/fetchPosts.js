import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const fetchPosts = createAsyncThunk("post/fetchPosts", async (data) => {
  const fetchPosts = functions.httpsCallable("sh-fetchPosts");
  const posts = fetchPosts({
    index: data.index,
    target: data.target,
    value: data.value,
    type: data.type,
    page: data.page,
  })
    .then(({ data }) => {
      return {
        index: data.index,
        posts: data.posts.filter((post) => post),
        hit: data.hit,
      };
    })
    .catch((e) => {});

  return posts;
});
