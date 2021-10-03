import { functions } from "../../../firebase";

export const addEntry = (state, action) => {
  state.user.entries[action.payload.index] = [
    action.payload.objectID,
    ...state.user.entries[action.payload.index],
  ];

  const addEntry = functions.httpsCallable("sh-addEntry");
  addEntry({
    index: action.payload.index,
    objectID: action.payload.objectID,
  }).catch((e) => {});
};
