import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "./features/post/functions/fetchPosts";
import * as rootSlice from "./features/root/rootSlice";
import * as postSlice from "./features/post/postSlice";
import * as userSlice from "./features/user/userSlice";

import { Menu } from "./components/menu/Menu";
import { Header } from "./components/header/Header";
import { Fetch } from "./components/load/Load";

import { List } from "./features/post/list/List";

export const Search = () => {
  const dispatch = useDispatch();

  const index = useSelector(rootSlice.index);
  const search = useSelector(rootSlice.search);
  const user = useSelector(userSlice.user);

  const posts = useSelector((state) =>
    postSlice.posts({ state: state, page: "search", index: index })
  );

  const hit = useSelector((state) =>
    postSlice.hit({ state: state, page: "search", index: index })
  );

  useEffect(() => {
    dispatch(rootSlice.handlePage("search"));
  }, [dispatch]);

  useEffect(() => {
    (search.value || search.target || search.type || !search.control) &&
      dispatch(
        fetchPosts({
          index: index,
          value: search.value,
          target: search.target,
          type: search.type,
          fetch: posts.length && true,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    index,
    search.control,
    search.target,
    search.type,
    search.value,
  ]);

  return (
    <>
      <Fetch />
      <Header index={index} user={user} posts={posts} search />
      <List index={index} posts={posts} user={user} search={search} hit={hit} />
      <Menu create user={user} />
    </>
  );
};
