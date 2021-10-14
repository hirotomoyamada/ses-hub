import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const extractPosts = createAsyncThunk(
  "post/extractPosts",
  async (data) => {
    const type = data.type;

    const extractPosts = functions.httpsCallable("sh-extractPosts");
    const posts = extractPosts({
      index: data.index,
      objectIDs: data.objectIDs,
      page: data.page,
    })
      .then(({ data }) => {
        return {
          index: data.index,
          posts: data.posts.filter((post) => post),
          type: type,
          hit: data.hit,
        };
      })
      .catch((e) => {});

    return posts;
  }
);
