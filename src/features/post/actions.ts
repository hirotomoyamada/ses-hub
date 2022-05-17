import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions } from "libs/firebase";
import { httpsCallable, HttpsCallable } from "firebase/functions";
import { Matter, Resource, Company, Person } from "types/post";
import { Activity } from "features/post/initialState";

export interface CreatePost {
  arg: {
    index: "matters" | "resources";

    post:
      | {
          display: "public" | "private";
          status: string;
          title: string;
          position: string;
          body: string;
          location: {
            area: string;
            place: string | null;
          };
          period: {
            year: number;
            month: number;
          };
          costs: {
            display: "public" | "private";
            type: string;
            min?: number | null;
            max?: number | null;
            contract?: number | null;
          };
          adjustment: string;
          times: {
            start: string;
            end: string;
          };
          handles: string[];
          tools: string[];
          requires: string[];
          prefers: string[];
          interviews: {
            type: string;
            count: string;
          };
          remote: string;
          distribution: string;
          span: string;
          approval: string | null;
          note: string | null;
          memo: string | null;
        }
      | {
          display: "public" | "private";
          status: string;
          roman: {
            firstName: string;
            lastName: string;
          };
          position: string;
          sex: string;
          age: number;
          body: string;
          belong: string;
          station: string;
          period: {
            year: number;
            month: number;
          };
          costs: {
            display: "public" | "private";
            type: string;
            min?: number | null;
            max?: number | null;
            contract?: number | null;
          };
          handles: string[];
          tools: string[];
          skills: string[];
          parallel: string;
          note: string | null;
          memo?: {
            name: string | null;
            tel: string | null;
            address: string | null;
          };
        };
    page: "user" | "search" | "home";
  };

  data: {
    index: "matters" | "resources";
    post: Matter | Resource;
  };
}

export const createPost = createAsyncThunk(
  "post/createPost",
  async (
    arg: CreatePost["arg"]
  ): Promise<{
    page: "user" | "search" | "home";
    index: CreatePost["data"]["index"];
    post: CreatePost["data"]["post"];
  }> => {
    const createPost: HttpsCallable<
      { index: CreatePost["arg"]["index"]; post: CreatePost["arg"]["post"] },
      CreatePost["data"]
    > = httpsCallable(functions, "sh-createPost");
    const sendPost: HttpsCallable<CreatePost["data"], unknown> = httpsCallable(
      functions,
      "sh-sendPost"
    );

    const { data } = await createPost({
      index: arg.index,
      post: arg.post,
    });

    if (data) {
      await sendPost({ index: data.index, post: data.post }).catch(() => {
        return;
      });
    }

    return { page: arg.page, ...data };
  }
);

export interface FetchPosts {
  arg: {
    index: "matters" | "resources" | "companys" | "persons";
    target?: string;
    value?: string;
    type?: string;
    page?: number;
    pend?: boolean;
  };

  data: {
    index: "matters" | "resources" | "companys" | "persons";
    posts: Matter[] | Resource[] | Company[] | Person[];
    hit: {
      currentPage: number;
      posts: number;
      pages: number;
    };
  };
}

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (arg: FetchPosts["arg"]): Promise<FetchPosts["data"]> => {
    const fetchPosts: HttpsCallable<FetchPosts["arg"], FetchPosts["data"]> =
      httpsCallable(functions, "sh-fetchPosts");

    const { data } = await fetchPosts({
      index: arg.index,
      target: arg.target,
      value: arg.value ? arg.value : "",
      type: arg.type,
      page: arg.page,
    });

    return data;
  }
);

export interface FetchPost {
  arg: { index: "matters" | "resources"; objectID: string };
  data: { post: Matter | Resource; bests: Matter[] | Resource[] };
}

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (arg: FetchPost["arg"]): Promise<FetchPost["data"]> => {
    const fetchPost: HttpsCallable<FetchPost["arg"], FetchPost["data"]> =
      httpsCallable(functions, "sh-fetchPost");

    const { data } = await fetchPost({
      index: arg.index,
      objectID: arg.objectID,
    });

    return data;
  }
);

export interface ExtractPosts {
  arg: {
    index: "matters" | "resources" | "persons";
    type: "likes" | "outputs" | "entries";
    objectIDs?: string[];
    page?: number;
  };

  data: {
    index: "matters" | "resources" | "persons";
    type: "likes" | "outputs" | "entries";
    posts: Matter[] | Resource[] | Person[];
    hit: {
      currentPage: number;
      posts: number;
      pages: number;
    };
  };
}

export const extractPosts = createAsyncThunk(
  "post/extractPosts",
  async (arg: ExtractPosts["arg"]): Promise<ExtractPosts["data"]> => {
    if (!arg.objectIDs?.length) {
      throw Error(undefined);
    }

    const extractPosts: HttpsCallable<
      ExtractPosts["arg"],
      ExtractPosts["data"]
    > = httpsCallable(functions, "sh-extractPosts");

    const { data } = await extractPosts({
      index: arg.index,
      type: arg.type,
      objectIDs: arg.objectIDs,
      page: arg.page,
    });

    return data;
  }
);

export interface HomePosts {
  arg: {
    index: "matters" | "resources";
    follows: string[];
    page?: number;
    pend?: boolean;
  };

  data: {
    index: "matters" | "resources";
    posts: Matter[] | Resource[];
    hit: {
      currentPage: number;
      posts: number;
      pages: number;
    };
  };
}

export const homePosts = createAsyncThunk(
  "post/homePosts",
  async (arg: HomePosts["arg"]): Promise<HomePosts["data"]> => {
    const homePosts: HttpsCallable<HomePosts["arg"], HomePosts["data"]> =
      httpsCallable(functions, "sh-homePosts");

    const { data } = await homePosts({
      index: arg.index,
      follows: arg.follows,
      page: arg.page,
    });

    return data;
  }
);

export interface UserPosts {
  arg: {
    index: "matters" | "resources" | "companys";
    uid: string;
    uids?: string[];
    display?: string;
    status?: string;
    page?: number;
  };

  data: {
    index: "matters" | "resources" | "companys";
    posts: Matter[] | Resource[] | Company[];
    hit: {
      currentPage: number;
      posts: number;
      pages: number;
    };
  };
}

export const userPosts = createAsyncThunk(
  "post/userPosts",
  async (
    arg: UserPosts["arg"]
  ): Promise<{
    uid: UserPosts["arg"]["uid"];
    index: UserPosts["data"]["index"];
    posts: UserPosts["data"]["posts"];
    hit: UserPosts["data"]["hit"];
  }> => {
    const userPosts: HttpsCallable<UserPosts["arg"], UserPosts["data"]> =
      httpsCallable(functions, "sh-userPosts");

    const { data } = await userPosts({
      index: arg.index,
      uid: arg.uid,
      uids: arg.uids,
      display: arg.display,
      status: arg.status,
      page: arg.page,
    });

    return { uid: arg.uid, ...data };
  }
);

export interface PromotionPosts {
  arg: "matters" | "resources";

  data: {
    index: "matters" | "resources";
    posts: Matter[] | Resource[];
  };
}

export const promotionPosts = createAsyncThunk(
  "post/promotionPosts",
  async (arg: PromotionPosts["arg"]) => {
    const promotionPosts: HttpsCallable<
      PromotionPosts["arg"],
      PromotionPosts["data"]
    > = httpsCallable(functions, "sh-promotionPosts");

    const { data } = await promotionPosts(arg);

    return data;
  }
);

export interface FetchActivity {
  arg: { index: "matters" | "resources"; post: Matter | Resource };

  data: Activity;
}

export const fetchActivity = createAsyncThunk(
  "post/fetchActivity",
  async (arg: FetchActivity["arg"]) => {
    const fetchActivity: HttpsCallable<
      FetchActivity["arg"],
      FetchActivity["data"]
    > = httpsCallable(functions, "sh-fetchActivity");

    const { data } = await fetchActivity(arg);

    return data;
  }
);
