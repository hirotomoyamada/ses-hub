import { functions } from "../../../firebase";

export const deletePost = (state, action) => {
  Object.keys(state).forEach((type) => {
    if (type === "selectUser" || type === "bests" || type === "post") {
      return;
    }

    console.log(type);

    state[type][action.payload.index].posts = state[type][
      action.payload.index
    ].posts.filter((post) => post?.objectID !== action.payload.post.objectID);
  });

  const deletePost = functions.httpsCallable("sh-deletePost");
  deletePost({
    index: action.payload.index,
    post: action.payload.post,
  }).catch((e) => {});
};
