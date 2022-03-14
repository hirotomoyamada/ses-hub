import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePosts } from "hooks/usePosts";

import { fetchPosts } from "features/post/actions";
import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { Header } from "components/header/Header";
import { List } from "components/list/List";

export const Search: React.FC = () => {
  const dispatch = useDispatch();

  const index = useSelector(rootSlice.index);
  const search = useSelector(rootSlice.search);
  const user = useSelector(userSlice.user);

  const [posts, hit] = usePosts({ index: index, page: "search" });

  useEffect(() => {
    !search.control &&
      dispatch(
        fetchPosts({
          index: index,
          value: search.value,
          target: search.target,
          type: search.type,
          fetch: posts?.length ? true : false,
        })
      );
  }, [
    dispatch,
    index,
    search.control,
    search.target,
    search.type,
    search.value,
  ]);

  return (
    <div>
      <Header index={index} user={user} />
      <List index={index} posts={posts} user={user} search={search} hit={hit} />
    </div>
  );
};