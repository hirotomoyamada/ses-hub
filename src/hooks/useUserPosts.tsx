import { useSelector } from "react-redux";
import { RootState } from "app/store";
import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";
import * as postSlice from "features/post/postSlice";

import { Matter, Resource } from "types/post";
import { Company, Person } from "types/post";

export const useUserPosts = (
  index: {
    user: "companys" | "persons";
    post?: "matters" | "resources" | "companys" | "persons";
  },
  uid?: string
): [
  posts: Matter[] | Resource[] | Company[] | Person[] | undefined,
  hit:
    | {
        posts: number;
        pages: number;
        currentPage: number;
      }
    | undefined,
  sort: {
    status?: string;
    display?: string;
    control: boolean;
  }
] => {
  const user = useSelector(userSlice.user);

  const posts = useSelector((state: RootState) =>
    postSlice.posts({
      state: state,
      page:
        index.user === "companys"
          ? user?.uid === uid
            ? "user"
            : "selectUser"
          : "bests",
      index: index.post ? index.post : "matters",
    })
  );

  const hit = useSelector((state: RootState) =>
    postSlice.hit({
      state: state,
      page:
        index.user === "companys" && user?.uid === uid ? "user" : "selectUser",
      index: index.post ? index.post : "matters",
    })
  );

  const sort = useSelector(rootSlice.sort);

  return [posts, hit, sort];
};
