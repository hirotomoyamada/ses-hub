import * as reducers from "../reducers/reducers";

import { promotionPosts } from "../actions/promotionPosts";
import { fetchPosts } from "../actions/fetchPosts";
import { userPosts } from "../actions/userPosts";
import { homePosts } from "../actions/homePosts";
import { extractPosts } from "../actions/extractPosts";
import { fetchPost } from "../actions/fetchPost";
import { createPost } from "../actions/createPost";

export const post = (builder) => {
  builder.addCase(promotionPosts.fulfilled, (state, action) =>
    reducers.promotionPosts(state, action)
  );

  builder.addCase(fetchPosts.fulfilled, (state, action) =>
    reducers.fetchPosts(state, action)
  );

  builder.addCase(userPosts.fulfilled, (state, action) =>
    reducers.userPosts(state, action)
  );

  builder.addCase(homePosts.fulfilled, (state, action) =>
    reducers.homePosts(state, action)
  );

  builder.addCase(extractPosts.fulfilled, (state, action) =>
    reducers.extractPosts(state, action)
  );

  builder.addCase(fetchPost.pending, (state, action) =>
    reducers.resetPost(state, action)
  );

  builder.addCase(fetchPost.fulfilled, (state, action) =>
    reducers.fetchPost(state, action)
  );

  builder.addCase(createPost.fulfilled, (state, action) =>
    reducers.createPost(state, action)
  );
};
