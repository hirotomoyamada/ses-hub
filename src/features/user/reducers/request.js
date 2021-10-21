import { functions } from "../../../firebase";

export const addRequest = (state, action) => {
  state.selectUser.request = "hold";

  state.user.entries.persons = [
    action.payload.user.uid,
    ...state.user.entries.persons,
  ];

  const addRequest = functions.httpsCallable("sh-addRequest");
  addRequest({
    uid: action.payload.user.uid,
    body: action.payload.body,
  }).catch((e) => {});
};
