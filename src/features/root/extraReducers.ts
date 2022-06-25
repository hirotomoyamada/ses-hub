import {
  ActionReducerMapBuilder,
  PayloadAction,
  ArgAction,
  ErrorAction,
} from "@reduxjs/toolkit";
import { auth } from "libs/firebase";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";

import { Post } from "features/post/postSlice";
import { State } from "features/root/initialState";
import { Login } from "features/user/actions";

import * as reducers from "features/root/reducers";

export const extraReducers = (
  builder: ActionReducerMapBuilder<State>
): void => {
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith("/logout"),
    (state) => {
      state.load.root = false;

      reducers.verified(state);
    }
  );

  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith("/pending"),
    (
      state,
      action: ArgAction<{
        index?: "matters" | "resources" | "companys" | "persons";
        pend?: boolean;
      }>
    ) => {
      if (action.type.includes("/login/")) {
        if (state.page !== "account") state.load.root = true;

        return;
      }

      if (action.type.includes("/fetchUser/") && action.meta.arg.index)
        state.index =
          action.meta.arg.index !== "companys"
            ? action.meta.arg.index
            : "matters";

      if (action.type.includes("/fetchPosts/")) state.search.control = true;

      if (action.type.includes("/fetchPost/") && action.meta.arg.index)
        state.index = action.meta.arg.index;

      if (action.meta.arg.pend) {
        state.load.pend = true;

        return;
      }

      if (
        action.type.includes("/createChild/") ||
        action.type.includes("/changeEmail") ||
        action.type.includes("/deleteChild")
      ) {
        state.load.create = true;
      } else {
        state.load.fetch = true;
      }
    }
  );

  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith("/rejected"),
    (state, action: ErrorAction) => {
      if (action.type.includes("/login/")) {
        if (
          action.error?.code.includes("cancelled") ||
          action.error?.code.includes("data-loss") ||
          action.error?.code.includes("internal")
        ) {
          void signOut(auth);
          state.announce.error = "エラーが発生しました";
        }

        if (action.error?.code.includes("invalid-argument")) {
          state.verified.email = true;
        }

        if (action.error?.code.includes("not-found")) {
          state.verified.profile = true;
        }

        if (action.error?.code.includes("permission-denied")) {
          state.verified.status = "hold";
        }

        if (action.error?.code.includes("unauthenticated")) {
          state.verified.status = "disable";
        }

        state.verified.access = false;
        state.load.root = false;

        return;
      }

      if (action.type.includes("/createProfile/")) {
        state.verified.error = action.error.message;
      }

      if (action.type.includes("/fetchUser/")) {
        state.notFound = true;
        state.announce.error = "ユーザーが存在しません";
      }

      if (action.type.includes("/fetchPost/")) {
        if (action.error?.code.includes("cancelled")) {
          state.limit = true;
        } else {
          state.notFound = true;
          state.announce.error =
            action.meta.arg.index === "matters"
              ? "案件情報が削除されたか、非公開になったため取得できません"
              : action.meta.arg.index === "resources"
              ? "人材情報が削除されたか、非公開になったため取得できません"
              : undefined;
        }
      }

      if (
        (action.type.includes("/createPost/") ||
          action.type.includes("/editPost/") ||
          action.type.includes("/deletePost/") ||
          action.type.includes("/editProfile/") ||
          action.type.includes("/fetchPosts/") ||
          action.type.includes("/extractPosts/") ||
          action.type.includes("/homePosts/") ||
          action.type.includes("/promotionPosts/") ||
          action.type.includes("/userPosts/") ||
          action.type.includes("/fetchProducts/")) &&
        (!state.modal.open ||
          state.modal.type === "home" ||
          state.modal.type === "account" ||
          state.modal.type === "edit" ||
          state.modal.type === "profile" ||
          state.modal.type === "new") &&
        !action.error.code?.includes("ok")
      ) {
        state.announce.error = action.error.message;
      }

      if (action.type.includes("/createChild/")) {
        state.announce.error = "アカウントの作成に失敗しました";

        const user = action.meta.arg.user;

        if (user) {
          void signInWithEmailAndPassword(auth, user.email, user.password);
        }
      }

      if (action.type.includes("/changeEmailChild/")) {
        state.announce.error = "メールアドレスの変更に失敗しました";

        const user = action.meta.arg.user;

        if (user) {
          void signInWithEmailAndPassword(auth, user.email, user.password);
        }
      }

      if (action.type.includes("/deleteChild/")) {
        state.announce.error = "アカウントの削除に失敗しました";

        const user = action.meta.arg.user;

        if (user) {
          void signInWithEmailAndPassword(auth, user.email, user.password);
        }
      }

      state.load.fetch = false;
      state.load.pend = false;
      state.load.create = false;
    }
  );

  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith("/fulfilled"),
    (state, action: PayloadAction<Login["data"]>) => {
      if (action.type.includes("login")) {
        reducers.verified(state, action);

        state.load.root = false;

        return;
      }

      if (action.type.includes("/createProfile/")) {
        state.verified.email = false;
        state.verified.profile = false;
        state.verified.agree = false;
        state.verified.status = "hold";
      }

      if (action.type.includes("/userPosts/")) {
        state.sort.control = false;
      }

      state.load.fetch = false;
      state.load.pend = false;
      state.load.create = false;
    }
  );

  builder.addMatcher(
    (action: PayloadAction) =>
      action.type.endsWith("/addRequest") ||
      action.type.endsWith("/updateNotice") ||
      action.type.endsWith("/updateHome") ||
      action.type.endsWith("/createPost/fulfilled") ||
      action.type.endsWith("/editPost/fulfilled") ||
      action.type.endsWith("/deletePost/fulfilled") ||
      action.type.endsWith("/editProfile/fulfilled") ||
      action.type.endsWith("/createChild/fulfilled") ||
      action.type.endsWith("/changeEmailChild/fulfilled") ||
      action.type.endsWith("/deleteChild/fulfilled"),
    (state, action: PayloadAction<{ back?: boolean } | undefined>) => {
      reducers.modal(state);

      if (action.payload?.back) window.location.href = "/search";
    }
  );

  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith("/editPost"),
    (state, action: PayloadAction<Post>) => {
      if (action.payload.post.display === "public" && state.page !== "search") {
        state.search.control = false;
      }
    }
  );
};
