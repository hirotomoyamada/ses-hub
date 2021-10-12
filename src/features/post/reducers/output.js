export const addOutput = (state, action) => {
  if (state.outputs[action.payload.index].posts.length) {
    state.outputs[action.payload.index].posts = [
      action.payload.post,
      ...state.outputs[action.payload.index].posts,
    ];
  }
};

export const removeOutput = (state, action) => {
  if (!action.payload.objectIDs) {
    state.outputs[action.payload.index].posts = state.outputs[
      action.payload.index
    ].posts.filter((post) => post.objectID !== action.payload.post.objectID);
  } else {
    state.outputs[action.payload.index].posts = state.outputs[
      action.payload.index
    ].posts.filter(
      (post) => action.payload.objectIDs.indexOf(post.objectID) < 0
    );
  }
};
