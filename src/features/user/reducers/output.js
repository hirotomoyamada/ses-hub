import { functions } from "../../../firebase";

export const addOutput = (state, action) => {
  state.user.outputs[action.payload.index] = [
    action.payload.objectID,
    ...state.user.outputs[action.payload.index],
  ];

  const addOutput = functions.httpsCallable("sh-addOutput");
  addOutput({
    index: action.payload.index,
    objectID: action.payload.objectID,
  }).catch((e) => {});
};

export const removeOutput = (state, action) => {
  if (!action.payload.objectIDs) {
    state.user.outputs[action.payload.index] = state.user.outputs[
      action.payload.index
    ].filter((objectID) => objectID !== action.payload.objectID);
  } else {
    state.user.outputs[action.payload.index] = state.user.outputs[
      action.payload.index
    ].filter((objectID) => action.payload.objectIDs.indexOf(objectID) < 0);
  }

  const removeOutput = functions.httpsCallable("sh-removeOutput");
  removeOutput({
    index: action.payload.index,
    objectID: action.payload.objectID,
    objectIDs: action.payload.objectIDs,
  }).catch((e) => {});
};
