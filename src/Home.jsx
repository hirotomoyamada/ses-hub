import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { followsPosts } from "./features/post/actions/followsPosts";
import * as rootSlice from "./features/root/rootSlice";
import * as postSlice from "./features/post/postSlice";
import * as userSlice from "./features/user/userSlice";

import { Header } from "./components/header/Header";
import { List } from "./features/post/list/List";
import { Fetch } from "./components/load/Load";

export const Home = () => {
  const dispatch = useDispatch();

  const index = useSelector(rootSlice.index);
  const user = useSelector(userSlice.user);

  const posts = useSelector((state) =>
    postSlice.posts({
      state: state,
      page: "home",
      index: index === "matters" || index === "resources" ? index : "matters",
    })
  );

  const hit = useSelector((state) =>
    postSlice.hit({
      state: state,
      page: "home",
      index: index === "matters" || index === "resources" ? index : "matters",
    })
  );

  const control = useSelector((state) =>
    postSlice.control({
      state: state,
      index: index === "matters" || index === "resources" ? index : "matters",
    })
  );

  useEffect(() => {
    (index === "companys" || index === "persons") &&
      dispatch(rootSlice.handleIndex("matters"));
  }, [dispatch, index]);

  useEffect(() => {
    dispatch(rootSlice.handlePage("home"));
  }, [dispatch]);

  useEffect(() => {
    (index === "matters" || index === "resources") &&
      (!posts.length || control) &&
      dispatch(
        followsPosts({
          index: index,
          follows: [user.uid, ...user.home],
          fetch: posts.length && true,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, index, user.home]);

  return (
    <div>
      <Fetch />
      <Header index={index} user={user} home />
      <List index={index} posts={posts} user={user} hit={hit} home />
    </div>
  );
};
