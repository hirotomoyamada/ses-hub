import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePosts } from "hooks/usePosts";

import { homePosts } from "features/post/actions";
import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { Header } from "components/header/Header";
import { List } from "components/list/List";

export const Home: React.FC = () => {
  const dispatch = useDispatch();

  const index = useSelector(rootSlice.index);
  const user = useSelector(userSlice.user);

  const [posts, hit, control] = usePosts({ index: index, page: "home" });

  useEffect(() => {
    (index === "matters" || index === "resources") &&
      (!posts?.length || control) &&
      dispatch(
        homePosts({
          index: index,
          follows: [user?.uid, ...user?.home],
          fetch: posts?.length ? true : false,
        })
      );
  }, [dispatch, index, user.home]);

  return (
    <div>
      <Header index={index} user={user} />
      <List index={index} posts={posts} user={user} hit={hit} home />
    </div>
  );
};
