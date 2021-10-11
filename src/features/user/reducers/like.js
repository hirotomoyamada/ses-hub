import { functions } from "../../../firebase";

export const addLike = (state, action) => {
  state.user.likes[action.payload.index] = [
    action.payload.post.objectID,
    ...state.user.likes[action.payload.index],
  ];

  const addLike = functions.httpsCallable("sh-addLike");
  addLike({
    index: action.payload.index,
    objectID: action.payload.post.objectID,
  }).catch((e) => {});
};

export const removeLike = (state, action) => {
  state.user.likes[action.payload.index] = state.user.likes[
    action.payload.index
  ].filter((objectID) => objectID !== action.payload.post.objectID);

  const removeLike = functions.httpsCallable("sh-removeLike");
  removeLike({
    index: action.payload.index,
    objectID: action.payload.post.objectID,
  }).catch((e) => {});
};
