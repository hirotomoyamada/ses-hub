import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "../../../firebase";

export const userPosts = createAsyncThunk("post/userPosts", async (data) => {
  const uid = data.uid;

  const userPosts = functions.httpsCallable("sh-userPosts");

  const posts = await userPosts({
    index: data.index,
    uid: data.uid,
    uids: data.uids,
    display: data.display,
    status: data.status,
    page: data.page,
  })
    .then(({ data }) => {
      return {
        index: data.index,
        uid: uid,
        posts: data.posts.filter((post) => post),
        hit: data.hit,
      };
    })
    .catch((e) => {
      return { error: "ページを更新してください" };
    });

  return posts;
});
