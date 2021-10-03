export const addFollow = (state, action) => {
  if (state.posts.user.companys.posts.length) {
    state.posts.user.companys.posts = [
      action.payload,
      ...state.posts.user.companys.posts,
    ];
  }

  state.posts.home.matters.control = true;
  state.posts.home.resources.control = true;
};
export const removeFollow = (state, action) => {
  state.posts.user.companys.posts = state.posts.user.companys.posts.filter(
    (post) => post.uid !== action.payload.uid
  );

  Object.keys(state.posts.home).forEach((index) => {
    state.posts.home[index].posts = state.posts.home[index].posts.filter(
      (post) => post.uid !== action.payload.uid
    );
  });
};
