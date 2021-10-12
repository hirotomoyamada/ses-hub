export const createPost = (state, action) => {
  state.user.posts[action.payload.index] = [
    action.payload.post.objectID,
    ...state.user.posts[action.payload.index],
  ];
};

export const deletePost = (state, action) => {
  state.user.posts[action.payload.index] = state.user.posts[
    action.payload.index
  ].filter((objectID) => objectID !== action.payload.post.objectID);
};
