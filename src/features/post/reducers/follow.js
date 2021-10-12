export const addFollow = (state, action) => {
  if (state.user.companys.posts.length) {
    state.user.companys.posts = [action.payload, ...state.user.companys.posts];
  }

  state.home.matters.control = true;
  state.home.resources.control = true;
};
export const removeFollow = (state, action) => {
  state.user.companys.posts = state.user.companys.posts.filter(
    (post) => post.uid !== action.payload.uid
  );

  Object.keys(state.home).forEach((index) => {
    state.home[index].posts = state.home[index].posts.filter(
      (post) => post.uid !== action.payload.uid
    );
  });
};
