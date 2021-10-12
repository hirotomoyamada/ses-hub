export const addEntry = (state, action) => {
  if (state.entries[action.payload.index].posts.length) {
    state.entries[action.payload.index].posts = [
      action.payload.post,
      ...state.entries[action.payload.index].posts,
    ];
  }
};
