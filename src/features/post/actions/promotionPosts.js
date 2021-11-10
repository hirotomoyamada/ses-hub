import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const promotionPosts = createAsyncThunk(
  "post/promotionPosts",
  async (data) => {
    const promotionPosts = functions.httpsCallable("sh-promotionPosts");

    const posts = await promotionPosts({
      index: data.index,
    })
      .then(({ data }) => {
        return {
          index: data.index,
          posts: data.posts,
        };
      })
      .catch((e) => {});

    return posts;
  }
);
