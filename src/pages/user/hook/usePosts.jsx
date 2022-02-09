import { useSelector } from "react-redux";
import * as rootSlice from "../../../features/root/rootSlice";
import * as userSlice from "../../../features/user/userSlice";
import * as postSlice from "../../../features/post/postSlice";

export const usePosts = (index, uid) => {
  const user = useSelector(userSlice.user);

  const posts = useSelector((state) =>
    postSlice.posts({
      state: state,
      page:
        index.user === "companys"
          ? user?.uid === uid
            ? "user"
            : "selectUser"
          : "bests",
      index: index.post,
    })
  );

  const hit = useSelector((state) =>
    postSlice.hit({
      state: state,
      page:
        index.user === "companys" && user?.uid === uid
          ? "user"
          : "selectUser",
      index: index.post,
    })
  );

  const sort = useSelector(rootSlice.sort);

  return [posts, hit, sort];
};
