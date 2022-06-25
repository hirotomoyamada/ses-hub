import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePosts } from "hooks/usePosts";
import { useParams } from "react-router-dom";

import { fetchPosts } from "features/post/actions";
import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { Header } from "components/header/Header";
import { List } from "components/list/List";

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{
    index: "matters" | "resources" | "companys" | "persons";
  }>();
  const rootIndex = useSelector(rootSlice.index);
  const index = params.index ? params.index : rootIndex;
  const search = useSelector(rootSlice.search);
  const user = useSelector(userSlice.user);

  const [posts, hit] = usePosts({ index: index, page: "search" });

  useEffect(() => {
    if (params.index) {
      dispatch(rootSlice.handleIndex(params.index));
    }
  }, [params.index]);

  useEffect(() => {
    !search.control &&
      dispatch(
        fetchPosts({
          index: index,
          value: search.value,
          target: search.target,
          type: search.type,
          pend: posts?.length ? true : false,
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
