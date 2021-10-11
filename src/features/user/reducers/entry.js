import { functions } from "../../../firebase";

export const addEntry = (state, action) => {
  state.user.entries[action.payload.index] = [
    action.payload.post.objectID,
    ...state.user.entries[action.payload.index],
  ];

  const addEntry = functions.httpsCallable("sh-addEntry");
  addEntry({
    index: action.payload.index,
    objectID: action.payload.post.objectID,
  }).catch((e) => {});
};
