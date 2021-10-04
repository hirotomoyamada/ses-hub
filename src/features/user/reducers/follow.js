import { functions } from "../../../firebase";

export const addFollow = (state, action) => {
  state.user.follows = [action.payload, ...state.user.follows];

  if (state.user.home.length < 15) {
    state.user.home = [action.payload, ...state.user.home];
  }

  const addFollow = functions.httpsCallable("sh-addFollow");
  addFollow({ uid: action.payload }).catch((e) => {});
};

export const removeFollow = (state, action) => {
  state.user.follows = state.user.follows.filter(
    (uid) => uid !== action.payload
  );

  if (state.user.home.length <= 15) {
    state.user.home = state.user.home.filter((uid) => uid !== action.payload);
  }

  const removeFollow = functions.httpsCallable("sh-removeFollow");
  removeFollow({ uid: action.payload }).catch((e) => {});
};
