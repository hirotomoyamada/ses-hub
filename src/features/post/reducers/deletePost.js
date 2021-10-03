import { functions } from "../../../firebase";

export const deletePost = (state, action) => {
  Object.keys(state.posts).forEach((type) => {
    if (type === "selectUser" || type === "bests") {
      return;
    }

    state.posts[type][action.payload.index].posts = state.posts[type][
      action.payload.index
    ].posts.filter((post) => post?.objectID !== action.payload.post.objectID);
  });

  const deletePost = functions.httpsCallable("sh-deletePost");
  deletePost({
    index: action.payload.index,
    post: action.payload.post,
  }).catch((e) => {});
};
