import { functions, auth } from "../../../firebase";

export const editProfile = (state, action) => {
  if (state.user.uid === action.payload.uid) {
    state.user.icon = action.payload.icon;
    state.user.cover = action.payload.cover;
    state.user.profile.name = action.payload.name;
    state.user.profile.person = action.payload.person;
    state.user.profile.body = action.payload.body;
    state.user.profile.more = action.payload.more;
    state.user.profile.region = action.payload.region;
    state.user.profile.postal = action.payload.postal;
    state.user.profile.address = action.payload.address;
    state.user.profile.tel = action.payload.tel;
    state.user.profile.url = action.payload.url;
    state.user.profile.social = action.payload.social;

    auth.currentUser
      .updateProfile({
        displayName: action.payload.person,
      })
      .catch((e) => {});
  } else {
    const selectUser = state.selectUser.find(
      (user) => user.uid === action.payload.uid
    );

    if (selectUser) {
      selectUser.icon = action.payload.icon;
      selectUser.cover = action.payload.cover;
      selectUser.profile.name = action.payload.name;
      selectUser.profile.person = action.payload.person;
      selectUser.profile.body = action.payload.body;
      selectUser.profile.more = action.payload.more;
      selectUser.profile.region = action.payload.region;
      selectUser.profile.postal = action.payload.postal;
      selectUser.profile.address = action.payload.address;
      selectUser.profile.tel = action.payload.tel;
      selectUser.profile.url = action.payload.url;
      selectUser.profile.social = action.payload.social;
    }
  }

  const editProfile = functions.httpsCallable("sh-editProfile");
  editProfile(action.payload).catch((e) => {});
};
