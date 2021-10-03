import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const followsPosts = createAsyncThunk(
  "post/followsPosts",
  async (data) => {
    const followsPosts = functions.httpsCallable("sh-followsPosts");
    const posts = followsPosts({
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
  }
);
