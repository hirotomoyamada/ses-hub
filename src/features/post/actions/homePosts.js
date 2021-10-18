import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const homePosts = createAsyncThunk("post/homePosts", async (data) => {
  const homePosts = functions.httpsCallable("sh-homePosts");
  const posts = homePosts({
    index: data.index,
    follows: data.follows,
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
