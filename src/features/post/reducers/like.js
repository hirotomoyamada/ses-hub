export const addLike = (state, action) => {
  if (state.likes[action.payload.index].posts.length) {
    state.likes[action.payload.index].posts = [
      action.payload.post,
      ...state.likes[action.payload.index].posts,
    ];
  }
};

export const removeLike = (state, action) => {
  state.likes[action.payload.index].posts = state.likes[
    action.payload.index
  ].posts.filter((post) => post.objectID !== action.payload.post.objectID);
};
