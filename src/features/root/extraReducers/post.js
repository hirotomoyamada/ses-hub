export const post = (builder) => {
  builder.addMatcher(
    (action) => action.type.endsWith("/editPost"),
    (state, action) => {
      if (action.payload.post.display === "public") {
        state.search.control = false;
      }
    }
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/fetchPosts/fulfilled"),
    (state) => {
      state.search.control = true;
    }
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/userPosts/fulfilled"),
    (state) => {
      state.sort.control = false;
    }
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/fetchPost/pending"),
    (state, action) => {
      state.index = action.meta.arg.index;
    }
  );
};
