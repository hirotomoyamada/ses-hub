export const createPost = (state, action) => {
  state.user.posts[action.payload.index] = [
    action.payload.post,
    ...state.user.posts[action.payload.index],
  ];
};

export const deletePost = (state, action) => {
  state.user.posts[action.payload.index] = state.user.posts[
    action.payload.index
  ].filter((post) => post?.objectID !== action.payload.post.objectID);
};
