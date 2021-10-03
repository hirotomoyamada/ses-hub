import { auth } from "../../../firebase";

export const userPosts = (state, action) => {
  if (action.payload) {
    const user =
      auth.currentUser.uid === action.payload.uid ? "user" : "selectUser";

    if (action.payload.hit.currentPage !== 0 && action.payload.hit.pages > 1) {
      state.posts[user][action.payload.index].posts = [
        ...state.posts[user][action.payload.index].posts,
        ...action.payload.posts,
      ];
    } else {
      state.posts[user][action.payload.index].posts = action.payload.posts;
    }

    state.posts[user][action.payload.index].hit = {
      posts: action.payload.hit.posts,
      pages: action.payload.hit.pages,
      currentPage: action.payload.hit.currentPage,
    };
  }

  state.sort.control = false;
  state.load = false;
};
