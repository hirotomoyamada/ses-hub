import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, functions } from "libs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  deleteUser,
  User as CurrentUser,
} from "firebase/auth";
import { httpsCallable, HttpsCallable } from "firebase/functions";

import { Company, Person } from "types/post";
import { User, Data } from "types/user";
import { Analytics } from "features/user/initialState";
import { Profile } from "features/user/userSlice";

export interface Login {
  req: {
    emailVerified: CurrentUser["emailVerified"];
    providerData: CurrentUser["providerData"];
  };

  data: {
    user: User;

    data: Data;

    demo: boolean;
  };
}

export const login = createAsyncThunk(
  "user/login",
  async (arg: CurrentUser): Promise<Login["data"]> => {
    const login: HttpsCallable<Login["req"], Login["data"]> = httpsCallable(
      functions,
      "sh-login"
    );

    const { data } = await login({
      emailVerified: arg.emailVerified,
      providerData: arg.providerData,
    });

    return data;
  }
);

export interface CreateProfile {
  arg: {
    type: string;
    name: string;
    person: string;
    position: string | null;
    postal: string;
    address: string;
    tel: string;
    agree: string;
    provider: string;
    pend: boolean;
  };

  data: {
    displayName: string;
  };
}

export const createProfile = createAsyncThunk(
  "user/createProfile",
  async (arg: CreateProfile["arg"]): Promise<void> => {
    const createProfile: HttpsCallable<
      CreateProfile["arg"],
      CreateProfile["data"]
    > = httpsCallable(functions, "sh-createProfile");

    await createProfile(arg).then(async ({ data }): Promise<void> => {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: data.displayName,
        });
      }
    });
  }
);

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (arg: Profile): Promise<Profile> => {
    const editProfile: HttpsCallable<Profile, unknown> = httpsCallable(
      functions,
      "sh-editProfile"
    );

    await editProfile(arg);

    return arg;
  }
);

export interface Child {
  arg: {
    user: {
      email: string;
      password: string;
      uid?: string;
    };
    selectUser: {
      email: string;
      password: string;
      currentEmail?: string;
    };
  };

  data: {
    uid: string;
    icon: string;
    cover: string;
    type: string;
    profile: {
      name: string;
      person: string | null;
      body: string | null;
      postal: string | null;
      address: string | null;
      email: string;
      tel: string | null;
      more: string | null;
      region: string[];
      url: string | null;
      social: {
        twitter: string | null;
        instagram: string | null;
        line: string | null;
        linkedIn: string | null;
      };
    };
    createAt: string;
  };
}

export const createChild = createAsyncThunk(
  "user/createChild",
  async (arg: Child["arg"]): Promise<Child["data"] | void> => {
    const createChild: HttpsCallable<string, Child["data"]> = httpsCallable(
      functions,
      "sh-createChild"
    );

    const user = arg.user;
    const selectUser = arg.selectUser;

    const child = await createUserWithEmailAndPassword(
      auth,
      selectUser.email,
      selectUser.password
    ).then(async () => {
      return await createChild(user.uid)
        .then(async ({ data }) => {
          await signInWithEmailAndPassword(auth, user.email, user.password);

          return data;
        })
        .catch(async () => {
          const child = auth.currentUser;

          if (child) {
            await child.delete();
          }

          throw Error();
        });
    });

    return child;
  }
);

export const deleteChild = createAsyncThunk(
  "user/deleteChild",
  async (arg: Child["arg"]): Promise<string | void> => {
    const user = arg.user;
    const selectUser = arg.selectUser;

    const child = signInWithEmailAndPassword(
      auth,
      selectUser.email,
      selectUser.password
    ).then(async (): Promise<string | void> => {
      const child = auth.currentUser;

      if (child) {
        await deleteUser(child).then(async (): Promise<void> => {
          await signInWithEmailAndPassword(auth, user.email, user.password);
        });

        return child.uid;
      }
    });

    return child;
  }
);

export const changeEmailChild = createAsyncThunk(
  "user/changeEmailChild",
  async (arg: {
    user: Child["arg"]["user"];
    selectUser: Required<Child["arg"]["selectUser"]>;
  }): Promise<{ uid: string; email: string } | void> => {
    const changeEmail: HttpsCallable<{ uid: string; email: string }, unknown> =
      httpsCallable(functions, "sh-changeEmail");

    const user = arg.user;
    const selectUser = arg.selectUser;

    const child = await signInWithEmailAndPassword(
      auth,
      selectUser.currentEmail,
      selectUser.password
    ).then(async (): Promise<{ uid: string; email: string } | void> => {
      const child = auth.currentUser;

      if (child) {
        return await updateEmail(child, selectUser.email).then(
          async (): Promise<{ uid: string; email: string }> => {
            await changeEmail({
              uid: child.uid,
              email: selectUser.email,
            }).then(async (): Promise<void> => {
              await signInWithEmailAndPassword(auth, user.email, user.password);
            });

            return { uid: child.uid, email: selectUser.email };
          }
        );
      }
    });

    return child;
  }
);

export interface FetchUser {
  arg: {
    index: "companys" | "persons";
    uid?: string;
    uids?: string[];
    fetch?: boolean;
  };

  data: {
    user: Company | Company[];
    bests?: Person[];
  };
}

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (arg: FetchUser["arg"]): Promise<FetchUser["data"] | void> => {
    const fetchUser: HttpsCallable<FetchUser["arg"], FetchUser["data"]> =
      httpsCallable(functions, "sh-fetchUser");

    const { data } = await fetchUser({
      index: arg.index,
      uid: arg.uid,
      uids: arg.uids,
    });

    return data;
  }
);

export interface FetchAnalytics {
  arg: {
    uid: string;
    span: "total" | "day" | "week" | "month";
    active?: string[];
    order?: string[];
  };

  data: Analytics;
}

export const fetchAnalytics = createAsyncThunk(
  "user/fetchAnalytics",
  async (arg: FetchAnalytics["arg"]) => {
    const fetchAnalytics: HttpsCallable<
      Pick<FetchAnalytics["arg"], "uid" | "span">,
      FetchAnalytics["data"]
    > = httpsCallable(functions, "sh-fetchAnalytics");

    const { data } = await fetchAnalytics(arg);

    return {
      analytics: data,
      uid: arg.uid,
      active: arg.active,
      order: arg.order,
    };
  }
);
