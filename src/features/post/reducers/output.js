export const addOutput = (state, action) => {
  if (state.posts.outputs[action.payload.index].posts.length) {
    state.posts.outputs[action.payload.index].posts = [
      action.payload.post,
      ...state.posts.outputs[action.payload.index].posts,
    ];
  }
};

export const removeOutput = (state, action) => {
  if (!action.payload.objectIDs) {
    state.posts.outputs[action.payload.index].posts = state.posts.outputs[
      action.payload.index
    ].posts.filter((post) => post.objectID !== action.payload.post.objectID);
  } else {
    state.posts.outputs[action.payload.index].posts = state.posts.outputs[
      action.payload.index
    ].posts.filter(
      (post) => action.payload.objectIDs.indexOf(post.objectID) < 0
    );
  }
};
