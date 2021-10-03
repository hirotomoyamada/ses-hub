export const addEntry = (state, action) => {
  if (state.posts.entries[action.payload.index].posts.length) {
    state.posts.entries[action.payload.index].posts = [
      action.payload.post,
      ...state.posts.entries[action.payload.index].posts,
    ];
  }
};
