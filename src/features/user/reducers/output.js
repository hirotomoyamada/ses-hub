import { functions } from "../../../firebase";

export const addOutput = (state, action) => {
  state.user.outputs[action.payload.index] = [
    action.payload.post.objectID,
    ...state.user.outputs[action.payload.index],
  ];

  const addOutput = functions.httpsCallable("sh-addOutput");
  addOutput({
    index: action.payload.index,
    objectID: action.payload.post.objectID,
  }).catch((e) => {});
};

export const removeOutput = (state, action) => {
  if (!action.payload.objectIDs) {
    state.user.outputs[action.payload.index] = state.user.outputs[
      action.payload.index
    ].filter((objectID) => objectID !== action.payload.post.objectID);
  } else {
    state.user.outputs[action.payload.index] = state.user.outputs[
      action.payload.index
    ].filter((objectID) => action.payload.objectIDs.indexOf(objectID) < 0);
  }

  const removeOutput = functions.httpsCallable("sh-removeOutput");
  removeOutput({
    index: action.payload.index,
    objectID: action.payload.post?.objectID,
    objectIDs: action.payload.objectIDs,
  }).catch((e) => {});
};
