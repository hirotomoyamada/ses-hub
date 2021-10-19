import { functions } from "../../../firebase";

export const addLike = (state, action) => {
  state.user.likes[action.payload.index] = [
    action.payload.index !== "persons"
      ? action.payload.post.objectID
      : action.payload.post.uid,
    ...state.user.likes[action.payload.index],
  ];

  const addLike = functions.httpsCallable("sh-addLike");
  addLike({
    index: action.payload.index,
    objectID: action.payload.post.objectID,
    uid: action.payload.post.uid,
  }).catch((e) => {});
};

export const removeLike = (state, action) => {
  state.user.likes[action.payload.index] = state.user.likes[
    action.payload.index
  ].filter(
    (id) =>
      id !==
      (action.payload.index !== "persons"
        ? action.payload.post.objectID
        : action.payload.post.uid)
  );

  const removeLike = functions.httpsCallable("sh-removeLike");
  removeLike({
    index: action.payload.index,
    objectID: action.payload.post.objectID,
    uid: action.payload.post.uid,
  }).catch((e) => {});
};
