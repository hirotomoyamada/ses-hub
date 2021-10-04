import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { followsPosts } from "./features/post/functions/followsPosts";
import * as postSlice from "./features/post/postSlice";
import * as userSlice from "./features/user/userSlice";

import { Menu } from "./components/menu/Menu";
import { Header } from "./components/header/Header";
import { Modal } from "./components/modal/Modal";
import { Fetch } from "./components/load/Load";

import { List } from "./features/post/list/List";

export const Home = () => {
  const dispatch = useDispatch();

  const index = useSelector(postSlice.index);
  const info = useSelector(userSlice.data).information;
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
      dispatch(postSlice.selectIndex("matters"));
  }, [dispatch, index]);

  console.log([user.uid, ...user.home]);

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
    <>
      <Fetch />
      <Header index={index} user={user} info={info} />
      <List index={index} posts={posts} user={user} hit={hit} home />
      <Modal user={user} />
      <Menu create user={user} />
    </>
  );
};
