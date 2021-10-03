export const addLike = (state, action) => {
  if (state.posts.likes[action.payload.index].posts.length) {
    state.posts.likes[action.payload.index].posts = [
      action.payload.post,
      ...state.posts.likes[action.payload.index].posts,
    ];
  }
};

export const removeLike = (state, action) => {
  state.posts.likes[action.payload.index].posts = state.posts.likes[
    action.payload.index
  ].posts.filter((post) => post.objectID !== action.payload.post.objectID);
};
