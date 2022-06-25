import { PayloadAction } from "@reduxjs/toolkit";
import { auth } from "libs/firebase";

import { State, Activity } from "features/post/initialState";
import { Matter, Resource, Company, Person } from "types/post";
import { Post } from "features/post/postSlice";
import { Like, Output, Entry, Request } from "features/user/userSlice";

import {
  CreatePost,
  FetchPost,
  FetchPosts,
  ExtractPosts,
  HomePosts,
  UserPosts,
  PromotionPosts,
} from "features/post/actions";

export const createPost = (
  state: State,
  action: PayloadAction<{
    page: "user" | "search" | "home";
    index: CreatePost["data"]["index"];
    post: CreatePost["data"]["post"];
  }>
): void => {
  if (
    action.payload.post.display === "private" &&
    action.payload.page === "user"
  ) {
    state.user[action.payload.index].posts = [
      action.payload.post,
      ...state.user[action.payload.index].posts,
    ] as (Matter | undefined)[] | (Resource | undefined)[];
  } else if (action.payload.post.display === "public") {
    state[action.payload.page][action.payload.index].posts = [
      action.payload.post,
      ...state[action.payload.page][action.payload.index].posts,
    ] as (Matter | undefined)[] | (Resource | undefined)[];
  }
};

export const selectPost = (
  state: State,
  action: PayloadAction<Post["post"]>
): void => {
  state.post = action.payload;
};

export const resetPost = (
  state: State,
  action: PayloadAction<string | void>
): void => {
  if (action.type === "user/fetchUser/pending") {
    state.selectUser.matters.posts = [];
    state.selectUser.matters.hit.currentPage = 0;
    state.selectUser.resources.posts = [];
    state.selectUser.resources.hit.currentPage = 0;

    state.bests = [];

    return;
  }

  if (action.type === "post/resetPost" || action.payload === "post") {
    state.post = {};
    state.bests = [];
    state.activity = {};

    return;
  }

  if (Object.keys(state.post as Matter | Resource)?.length) {
    state.post = {};
    state.bests = [];
  } else {
    Object.keys(state).forEach((posts): void => {
      if (
        posts === "search" ||
        posts === "user" ||
        posts === "selectUser" ||
        posts === "home" ||
        posts === "likes" ||
        posts === "outputs" ||
        posts === "entries"
      ) {
        Object.keys(state[posts]).forEach((index): void => {
          if (
            index === "matters" ||
            index === "resources" ||
            index === "companys" ||
            index === "persons"
          ) {
            if (posts === "search") {
              state[posts][index].posts = state[posts][index].posts.slice(
                0,
                50
              );
              state[posts][index].hit.currentPage = 0;
            }

            if (posts === "user" && index !== "persons") {
              state[posts][index].posts = state[posts][index].posts.slice(
                0,
                50
              );
              state[posts][index].hit.currentPage = 0;
            }

            if (
              (posts === "likes" || posts === "entries") &&
              index !== "companys"
            ) {
              state[posts][index].posts = state[posts][index].posts.slice(
                0,
                50
              );
              state[posts][index].hit.currentPage = 0;
            }

            if (
              (posts === "home" ||
                posts === "selectUser" ||
                posts === "outputs") &&
              index !== "companys" &&
              index !== "persons"
            ) {
              state[posts][index].posts = state[posts][index].posts.slice(
                0,
                50
              );
              state[posts][index].hit.currentPage = 0;
            }
          }
        });
      }
    });
  }
};

export const resetControl = (state: State): void => {
  state.home.matters.control = true;
  state.home.resources.control = true;
};

export const editPost = (state: State, action: PayloadAction<Post>): void => {
  const timestamp: number = Date.now();

  if (action.payload.post.display === "private") {
    Object.keys(state).forEach((posts): void => {
      if (posts === "search" || posts === "home") {
        if (state[posts][action.payload.index].posts.length) {
          if (action.payload.index === "matters") {
            state[posts][action.payload.index].posts = state[posts][
              action.payload.index
            ].posts.filter(
              (post) => post?.objectID !== action.payload.post.objectID
            );
          }

          if (action.payload.index === "resources") {
            state[posts][action.payload.index].posts = state[posts][
              action.payload.index
            ].posts.filter(
              (post) => post?.objectID !== action.payload.post.objectID
            );
          }
        }
      }
    });
  }

  if (
    action.payload.post.display === "public" &&
    (state.post as Matter | Resource).display === "private"
  ) {
    state.home[action.payload.index].control = true;
  }

  Object.keys(state).forEach((posts): void => {
    if (
      posts === "search" ||
      posts === "user" ||
      posts === "home" ||
      posts === "likes" ||
      posts === "outputs" ||
      posts === "entries"
    ) {
      if (action.payload.index === "matters") {
        const post = state[posts][action.payload.index].posts.find(
          (post) => post?.objectID === action.payload.post.objectID
        );

        if (post) {
          post.display = (action.payload.post as Matter).display;
          post.title = (action.payload.post as Matter).title;
          post.position = (action.payload.post as Matter).position;
          post.body = (action.payload.post as Matter).body;
          post.location = (action.payload.post as Matter).location;
          post.period = (action.payload.post as Matter).period;
          post.costs = (action.payload.post as Matter).costs;
          post.adjustment = (action.payload.post as Matter).adjustment;
          post.times = (action.payload.post as Matter).times;
          post.handles = (action.payload.post as Matter).handles;
          post.tools = (action.payload.post as Matter).tools;
          post.requires = (action.payload.post as Matter).requires;
          post.prefers = (action.payload.post as Matter).prefers;
          post.interviews = (action.payload.post as Matter).interviews;
          post.remote = (action.payload.post as Matter).remote;
          post.distribution = (action.payload.post as Matter).distribution;
          post.span = (action.payload.post as Matter).span;
          post.approval = (action.payload.post as Matter).approval;
          post.note = (action.payload.post as Matter).note;
          post.status = (action.payload.post as Matter).status;
          post.memo = (action.payload.post as Matter).memo;
          post.updateAt = timestamp;
        }
      }

      if (action.payload.index === "resources") {
        const post = state[posts][action.payload.index].posts.find(
          (post) => post?.objectID === action.payload.post.objectID
        );

        if (post) {
          post.display = (action.payload.post as Resource).display;
          post.roman = (action.payload.post as Resource).roman;
          post.position = (action.payload.post as Resource).position;
          post.sex = (action.payload.post as Resource).sex;
          post.age = (action.payload.post as Resource).age;
          post.body = (action.payload.post as Resource).body;
          post.belong = (action.payload.post as Resource).belong;
          post.station = (action.payload.post as Resource).station;
          post.period = (action.payload.post as Resource).period;
          post.costs = (action.payload.post as Resource).costs;
          post.handles = (action.payload.post as Resource).handles;
          post.tools = (action.payload.post as Resource).tools;
          post.skills = (action.payload.post as Resource).skills;
          post.parallel = (action.payload.post as Resource).parallel;
          post.note = (action.payload.post as Resource).note;
          post.status = (action.payload.post as Resource).status;
          post.memo = (action.payload.post as Resource).memo;
          post.updateAt = timestamp;
        }
      }
    }
  });

  if (action.payload.index === "matters") {
    const post = state.post as Matter;

    post.display = (action.payload.post as Matter).display;
    post.title = (action.payload.post as Matter).title;
    post.position = (action.payload.post as Matter).position;
    post.body = (action.payload.post as Matter).body;
    post.location = (action.payload.post as Matter).location;
    post.period = (action.payload.post as Matter).period;
    post.costs = (action.payload.post as Matter).costs;
    post.adjustment = (action.payload.post as Matter).adjustment;
    post.times = (action.payload.post as Matter).times;
    post.handles = (action.payload.post as Matter).handles;
    post.tools = (action.payload.post as Matter).tools;
    post.requires = (action.payload.post as Matter).requires;
    post.prefers = (action.payload.post as Matter).prefers;
    post.interviews = (action.payload.post as Matter).interviews;
    post.remote = (action.payload.post as Matter).remote;
    post.distribution = (action.payload.post as Matter).distribution;
    post.span = (action.payload.post as Matter).span;
    post.approval = (action.payload.post as Matter).approval;
    post.note = (action.payload.post as Matter).note;
    post.status = (action.payload.post as Matter).status;
    post.memo = (action.payload.post as Matter).memo;
    post.updateAt = timestamp;
  }

  if (action.payload.index === "resources") {
    const post = state.post as Resource;

    post.display = (action.payload.post as Resource).display;
    post.roman = (action.payload.post as Resource).roman;
    post.position = (action.payload.post as Resource).position;
    post.sex = (action.payload.post as Resource).sex;
    post.age = (action.payload.post as Resource).age;
    post.body = (action.payload.post as Resource).body;
    post.belong = (action.payload.post as Resource).belong;
    post.station = (action.payload.post as Resource).station;
    post.period = (action.payload.post as Resource).period;
    post.costs = (action.payload.post as Resource).costs;
    post.handles = (action.payload.post as Resource).handles;
    post.tools = (action.payload.post as Resource).tools;
    post.skills = (action.payload.post as Resource).skills;
    post.parallel = (action.payload.post as Resource).parallel;
    post.note = (action.payload.post as Resource).note;
    post.status = (action.payload.post as Resource).status;
    post.memo = (action.payload.post as Resource).memo;
    post.updateAt = timestamp;
  }
};

export const deletePost = (
  state: State,
  action: PayloadAction<Post & { back?: boolean }>
): void => {
  Object.keys(state).forEach((posts): void => {
    if (
      posts === "search" ||
      posts === "user" ||
      posts === "home" ||
      posts === "likes" ||
      posts === "outputs" ||
      posts === "entries"
    ) {
      if (action.payload.index === "matters") {
        state[posts][action.payload.index].posts = state[posts][
          action.payload.index
        ].posts.filter(
          (post) => post?.objectID !== action.payload.post.objectID
        );
      }

      if (action.payload.index === "resources") {
        state[posts][action.payload.index].posts = state[posts][
          action.payload.index
        ].posts.filter(
          (post) => post?.objectID !== action.payload.post.objectID
        );
      }
    }
  });
};

export const fetchPosts = (
  state: State,
  action: PayloadAction<FetchPosts["data"]>
): void => {
  if (action.payload.hit.currentPage !== 0 && action.payload.hit.pages > 1) {
    state.search[action.payload.index].posts = [
      ...state.search[action.payload.index].posts,
      ...action.payload.posts,
    ] as
      | (Matter | undefined)[]
      | (Resource | undefined)[]
      | (Company | undefined)[]
      | (Person | undefined)[];
  } else {
    state.search[action.payload.index].posts = action.payload.posts;
  }

  state.search[action.payload.index].hit = {
    posts: action.payload.hit.posts,
    pages: action.payload.hit.pages,
    currentPage: action.payload.hit.currentPage,
  };
};

export const fetchPost = (
  state: State,
  action: PayloadAction<FetchPost["data"]>
): void => {
  state.post = action.payload.post;
  state.bests = action.payload.bests;
};

export const extractPosts = (
  state: State,
  action: PayloadAction<ExtractPosts["data"]>
): void => {
  if (action.payload.hit.currentPage !== 0 && action.payload.hit.pages > 1) {
    if (action.payload.type === "likes" || action.payload.type === "entries") {
      state[action.payload.type][action.payload.index].posts = [
        ...state[action.payload.type][action.payload.index].posts,
        ...action.payload.posts,
      ] as
        | (Matter | undefined)[]
        | (Resource | undefined)[]
        | (Person | undefined)[];
    }

    if (
      action.payload.type === "outputs" &&
      (action.payload.index === "matters" ||
        action.payload.index === "resources")
    ) {
      state[action.payload.type][action.payload.index].posts = [
        ...state[action.payload.type][action.payload.index].posts,
        ...action.payload.posts,
      ] as (Matter | undefined)[] | (Resource | undefined)[];
    }
  } else {
    if (action.payload.type === "likes" || action.payload.type === "entries") {
      state[action.payload.type][action.payload.index].posts =
        action.payload.posts;
    }

    if (
      action.payload.type === "outputs" &&
      (action.payload.index === "matters" ||
        action.payload.index === "resources")
    ) {
      state[action.payload.type][action.payload.index].posts = action.payload
        .posts as (Matter | undefined)[] | (Resource | undefined)[];
    }
  }

  if (action.payload.type === "likes" || action.payload.type === "entries") {
    state[action.payload.type][action.payload.index].hit = {
      posts: action.payload.hit.posts,
      pages: action.payload.hit.pages,
      currentPage: action.payload.hit.currentPage,
    };
  }

  if (
    action.payload.type === "outputs" &&
    (action.payload.index === "matters" || action.payload.index === "resources")
  ) {
    state[action.payload.type][action.payload.index].hit = {
      posts: action.payload.hit.posts,
      pages: action.payload.hit.pages,
      currentPage: action.payload.hit.currentPage,
    };
  }
};

export const homePosts = (
  state: State,
  action: PayloadAction<HomePosts["data"]>
): void => {
  if (action.payload.hit.currentPage !== 0) {
    state.home[action.payload.index].posts = [
      ...state.home[action.payload.index].posts,
      ...action.payload.posts,
    ] as (Matter | undefined)[] | (Resource | undefined)[];
  } else {
    state.home[action.payload.index].posts = action.payload.posts;

    state.home[action.payload.index].control = false;
  }

  state.home[action.payload.index].hit = {
    posts: action.payload.hit.posts,
    pages: action.payload.hit.pages,
    currentPage: action.payload.hit.currentPage,
  };

  state.home[action.payload.index].control = false;
};

export const userPosts = (
  state: State,
  action: PayloadAction<{
    uid: UserPosts["arg"]["uid"];
    index: UserPosts["data"]["index"];
    posts: UserPosts["data"]["posts"];
    hit: UserPosts["data"]["hit"];
  }>
): void => {
  if (auth.currentUser) {
    if (action.payload.hit.currentPage !== 0 && action.payload.hit.pages > 1) {
      if (auth.currentUser.uid === action.payload.uid) {
        state.user[action.payload.index].posts = [
          ...state.user[action.payload.index].posts,
          ...action.payload.posts,
        ] as
          | (Matter | undefined)[]
          | (Resource | undefined)[]
          | (Company | undefined)[];
      } else if (
        action.payload.index === "matters" ||
        action.payload.index === "resources"
      ) {
        state.selectUser[action.payload.index].posts = [
          ...state.selectUser[action.payload.index].posts,
          ...action.payload.posts,
        ] as (Matter | undefined)[] | (Resource | undefined)[];
      }
    } else {
      if (auth.currentUser.uid === action.payload.uid) {
        state.user[action.payload.index].posts = action.payload.posts;
      } else if (
        action.payload.index === "matters" ||
        action.payload.index === "resources"
      ) {
        state.selectUser[action.payload.index].posts = action.payload.posts as
          | (Matter | undefined)[]
          | (Resource | undefined)[];
      }
    }

    if (auth.currentUser.uid === action.payload.uid) {
      state.user[action.payload.index].hit = {
        posts: action.payload.hit.posts,
        pages: action.payload.hit.pages,
        currentPage: action.payload.hit.currentPage,
      };
    } else if (
      action.payload.index === "matters" ||
      action.payload.index === "resources"
    ) {
      state.selectUser[action.payload.index].hit = {
        posts: action.payload.hit.posts,
        pages: action.payload.hit.pages,
        currentPage: action.payload.hit.currentPage,
      };
    }
  }
};

export const promotionPosts = (
  state: State,
  action: PayloadAction<PromotionPosts["data"]>
): void => {
  state.search[action.payload.index].posts = action.payload.posts;
};

export const addLike = (state: State, action: PayloadAction<Like>): void => {
  if (state.likes[action.payload.index].posts.length) {
    state.likes[action.payload.index].posts = [
      action.payload.post,
      ...state.likes[action.payload.index].posts,
    ] as
      | (Matter | undefined)[]
      | (Resource | undefined)[]
      | (Person | undefined)[];
  }

  Object.keys(state).forEach((posts): void => {
    if (
      posts === "search" ||
      posts === "user" ||
      posts === "home" ||
      posts === "likes" ||
      posts === "outputs" ||
      posts === "entries"
    ) {
      if (action.payload.index === "matters") {
        const post = state[posts][action.payload.index].posts.find(
          (post) => post?.objectID === (action.payload.post as Matter).objectID
        );

        if (post) {
          if (post.likes) {
            post.likes += 1;
          } else {
            Object.assign(post, { likes: 1 });
          }
        }
      }

      if (action.payload.index === "resources") {
        const post = state[posts][action.payload.index].posts.find(
          (post) =>
            post?.objectID === (action.payload.post as Resource).objectID
        );

        if (post) {
          if (post.likes) {
            post.likes += 1;
          } else {
            Object.assign(post, { likes: 1 });
          }
        }
      }

      if (action.payload.index === "persons") {
        if (posts === "search" || posts === "likes" || posts === "entries") {
          const post = state[posts][action.payload.index].posts.find(
            (post) => post?.uid === action.payload.post.uid
          );

          if (post) {
            if (post.likes) {
              post.likes += 1;
            } else {
              Object.assign(post, { likes: 1 });
            }
          }
        }
      }
    }

    if (posts === "bests") {
      if (action.payload.index === "matters") {
        const post = (state.bests as (Matter | undefined)[]).find(
          (post) => post?.objectID === (action.payload.post as Matter).objectID
        );

        if (post) {
          if (post.likes) {
            post.likes += 1;
          } else {
            Object.assign(post, { likes: 1 });
          }
        }
      }

      if (action.payload.index === "resources") {
        const post = (state.bests as (Resource | undefined)[]).find(
          (post) =>
            post?.objectID === (action.payload.post as Resource).objectID
        );

        if (post) {
          if (post.likes) {
            post.likes += 1;
          } else {
            Object.assign(post, { likes: 1 });
          }
        }
      }

      if (action.payload.index === "persons") {
        const post = (state.bests as (Person | undefined)[]).find(
          (post) => post?.uid === (action.payload.post as Person).uid
        );

        if (post) {
          if (post.likes) {
            post.likes += 1;
          } else {
            Object.assign(post, { likes: 1 });
          }
        }
      }
    }
  });
};

export const removeLike = (state: State, action: PayloadAction<Like>): void => {
  if (action.payload.index === "matters") {
    state.likes.matters.posts = state.likes.matters.posts.filter(
      (post) => post?.objectID !== (action.payload?.post as Matter).objectID
    );
  }

  if (action.payload.index === "resources") {
    state.likes.resources.posts = state.likes.resources.posts.filter(
      (post) => post?.objectID !== (action.payload?.post as Resource).objectID
    );
  }

  if (action.payload.index === "persons") {
    state.likes.persons.posts = state.likes.persons.posts.filter(
      (post) => post?.uid !== (action.payload?.post as Person).uid
    );
  }

  Object.keys(state).forEach((posts): void => {
    if (
      posts === "search" ||
      posts === "user" ||
      posts === "home" ||
      posts === "likes" ||
      posts === "outputs" ||
      posts === "entries"
    ) {
      if (action.payload.index === "matters") {
        const post = state[posts][action.payload.index].posts.find(
          (post) => post?.objectID === (action.payload.post as Matter).objectID
        );

        if (post && post.likes) {
          post.likes -= 1;
        }
      }

      if (action.payload.index === "resources") {
        const post = state[posts][action.payload.index].posts.find(
          (post) =>
            post?.objectID === (action.payload.post as Resource).objectID
        );

        if (post && post.likes) {
          post.likes -= 1;
        }
      }

      if (action.payload.index === "persons") {
        if (posts === "search" || posts === "likes" || posts === "entries") {
          const post = state[posts][action.payload.index].posts.find(
            (post) => post?.uid === action.payload.post.uid
          );

          if (post && post.likes) {
            post.likes -= 1;
          }
        }
      }
    }

    if (posts === "bests") {
      if (action.payload.index === "matters") {
        const post = (state.bests as (Matter | undefined)[]).find(
          (post) => post?.objectID === (action.payload.post as Matter).objectID
        );

        if (post && post.likes) {
          post.likes -= 1;
        }
      }

      if (action.payload.index === "resources") {
        const post = (state.bests as (Resource | undefined)[]).find(
          (post) =>
            post?.objectID === (action.payload.post as Resource).objectID
        );

        if (post && post.likes) {
          post.likes -= 1;
        }
      }

      if (action.payload.index === "persons") {
        const post = (state.bests as (Person | undefined)[]).find(
          (post) => post?.uid === (action.payload.post as Person).uid
        );

        if (post && post.likes) {
          post.likes -= 1;
        }
      }
    }
  });
};

export const addOutput = (
  state: State,
  action: PayloadAction<Output>
): void => {
  if (state.outputs[action.payload.index].posts.length) {
    state.outputs[action.payload.index].posts = [
      action.payload?.post,
      ...state.outputs[action.payload.index].posts,
    ] as (Matter | undefined)[] | (Resource | undefined)[];
  }

  Object.keys(state).forEach((posts): void => {
    if (
      posts === "search" ||
      posts === "user" ||
      posts === "home" ||
      posts === "likes" ||
      posts === "outputs" ||
      posts === "entries"
    ) {
      if (action.payload.index === "matters") {
        const post = state[posts][action.payload.index].posts.find(
          (post) => post?.objectID === (action.payload.post as Matter).objectID
        );

        if (post) {
          if (post.outputs) {
            post.outputs += 1;
          } else {
            Object.assign(post, { outputs: 1 });
          }
        }
      }

      if (action.payload.index === "resources") {
        const post = state[posts][action.payload.index].posts.find(
          (post) =>
            post?.objectID === (action.payload.post as Resource).objectID
        );

        if (post) {
          if (post.outputs) {
            post.outputs += 1;
          } else {
            Object.assign(post, { outputs: 1 });
          }
        }
      }
    }

    if (posts === "bests") {
      if (action.payload.index === "matters") {
        const post = (state.bests as (Matter | undefined)[]).find(
          (post) => post?.objectID === (action.payload.post as Matter).objectID
        );

        if (post) {
          if (post.outputs) {
            post.outputs += 1;
          } else {
            Object.assign(post, { outputs: 1 });
          }
        }
      }

      if (action.payload.index === "resources") {
        const post = (state.bests as (Resource | undefined)[]).find(
          (post) =>
            post?.objectID === (action.payload.post as Resource).objectID
        );

        if (post) {
          if (post.outputs) {
            post.outputs += 1;
          } else {
            Object.assign(post, { outputs: 1 });
          }
        }
      }
    }
  });
};

export const removeOutput = (
  state: State,
  action: PayloadAction<Output>
): void => {
  if (!action.payload.objectIDs) {
    if (action.payload.index === "matters") {
      state.outputs.matters.posts = state.outputs.matters.posts.filter(
        (post) =>
          post &&
          action.payload.post &&
          post.objectID !== action.payload.post.objectID
      );
    }

    if (action.payload.index === "resources") {
      state.outputs.resources.posts = state.outputs.resources.posts.filter(
        (post) =>
          post &&
          action.payload.post &&
          post.objectID !== action.payload.post.objectID
      );
    }

    Object.keys(state).forEach((posts): void => {
      if (
        posts === "search" ||
        posts === "user" ||
        posts === "home" ||
        posts === "likes" ||
        posts === "outputs" ||
        posts === "entries"
      ) {
        if (action.payload.index === "matters") {
          const post = state[posts][action.payload.index].posts.find(
            (post) =>
              action.payload.post &&
              post?.objectID === action.payload.post.objectID
          );

          if (post && post.outputs) {
            post.outputs -= 1;
          }
        }

        if (action.payload.index === "resources") {
          const post = state[posts][action.payload.index].posts.find(
            (post) =>
              action.payload.post &&
              post?.objectID === action.payload.post.objectID
          );

          if (post && post.outputs) {
            post.outputs -= 1;
          }
        }
      }

      if (posts === "bests") {
        if (action.payload.index === "matters") {
          const post = (state.bests as (Matter | undefined)[]).find(
            (post) =>
              post?.objectID === (action.payload.post as Matter).objectID
          );

          if (post && post.outputs) {
            post.outputs -= 1;
          }
        }

        if (action.payload.index === "resources") {
          const post = (state.bests as (Resource | undefined)[]).find(
            (post) =>
              post?.objectID === (action.payload.post as Resource).objectID
          );

          if (post && post.outputs) {
            post.outputs -= 1;
          }
        }
      }
    });
  } else {
    if (action.payload.index === "matters") {
      state.outputs.matters.posts = state.outputs.matters.posts.filter(
        (post) =>
          post &&
          action.payload.objectIDs &&
          action.payload.objectIDs.indexOf(post.objectID) < 0
      );
    }

    if (action.payload.index === "resources") {
      state.outputs.resources.posts = state.outputs.resources.posts.filter(
        (post) =>
          post &&
          action.payload.objectIDs &&
          action.payload.objectIDs.indexOf(post.objectID) < 0
      );
    }

    action.payload.objectIDs.forEach((objectID) => {
      Object.keys(state).forEach((posts): void => {
        if (
          posts === "search" ||
          posts === "user" ||
          posts === "home" ||
          posts === "likes" ||
          posts === "outputs" ||
          posts === "entries"
        ) {
          if (action.payload.index === "matters") {
            const post = state[posts][action.payload.index].posts.find(
              (post) => post?.objectID === objectID
            );

            if (post && post.outputs) {
              post.outputs -= 1;
            }
          }

          if (action.payload.index === "resources") {
            const post = state[posts][action.payload.index].posts.find(
              (post) => post?.objectID === objectID
            );

            if (post && post.outputs) {
              post.outputs -= 1;
            }
          }
        }
      });
    });
  }
};

export const addEntry = (state: State, action: PayloadAction<Entry>): void => {
  if (state.entries[action.payload.index].posts.length) {
    state.entries[action.payload.index].posts = [
      action.payload.post,
      ...state.entries[action.payload.index].posts,
    ] as (Matter | undefined)[] | (Resource | undefined)[];
  }

  Object.keys(state).forEach((posts): void => {
    if (
      posts === "search" ||
      posts === "user" ||
      posts === "home" ||
      posts === "likes" ||
      posts === "outputs" ||
      posts === "entries"
    ) {
      if (action.payload.index === "matters") {
        const post = state[posts][action.payload.index].posts.find(
          (post) => post?.objectID === action.payload.post.objectID
        );

        if (post) {
          if (post.entries) {
            post.entries += 1;
          } else {
            Object.assign(post, { entries: 1 });
          }
        }
      }

      if (action.payload.index === "resources") {
        const post = state[posts][action.payload.index].posts.find(
          (post) => post?.objectID === action.payload.post.objectID
        );

        if (post) {
          if (post.entries) {
            post.entries += 1;
          } else {
            Object.assign(post, { entries: 1 });
          }
        }
      }
    }

    if (posts === "bests") {
      if (action.payload.index === "matters") {
        const post = (state.bests as (Matter | undefined)[]).find(
          (post) => post?.objectID === (action.payload.post as Matter).objectID
        );

        if (post) {
          if (post.entries) {
            post.entries += 1;
          } else {
            Object.assign(post, { entries: 1 });
          }
        }
      }

      if (action.payload.index === "resources") {
        const post = (state.bests as (Resource | undefined)[]).find(
          (post) =>
            post?.objectID === (action.payload.post as Resource).objectID
        );

        if (post) {
          if (post.entries) {
            post.entries += 1;
          } else {
            Object.assign(post, { entries: 1 });
          }
        }
      }
    }
  });
};

export const addFollow = (
  state: State,
  action: PayloadAction<Company>
): void => {
  if (state.user.companys.posts.length) {
    state.user.companys.posts = [action.payload, ...state.user.companys.posts];
  }

  state.home.matters.control = true;
  state.home.resources.control = true;
};
export const removeFollow = (
  state: State,
  action: PayloadAction<Company>
): void => {
  state.user.companys.posts = state.user.companys.posts.filter(
    (post) => post?.uid !== action.payload.uid
  );

  Object.keys(state.home).forEach((index) => {
    if (index === "matters") {
      state.home[index].posts = state.home[index].posts.filter(
        (post) => post?.uid !== action.payload.uid
      );
    }

    if (index === "resources") {
      state.home[index].posts = state.home[index].posts.filter(
        (post) => post?.uid !== action.payload.uid
      );
    }
  });
};

export const addRequest = (
  state: State,
  action: PayloadAction<Request>
): void => {
  if (state.entries.persons.posts.length) {
    state.entries.persons.posts = [
      {
        request: "hold",
        ...action.payload.user,
      },
      ...state.entries.persons.posts,
    ];
  }
};

export const fetchActivity = (
  state: State,
  action: PayloadAction<Activity>
): void => {
  state.activity = action.payload;
};
