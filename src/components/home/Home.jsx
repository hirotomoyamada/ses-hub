import styles from "./Home.module.scss";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Header } from "./components/header/Header";
import { List } from "./components/List/List";

import { userPosts } from "../../features/post/functions/userPosts";

import * as postSlice from "../../features/post/postSlice";
import * as userSlice from "../../features/user/userSlice";
import { Select } from "./components/select/Select";

export const Home = ({ user }) => {
  const dispatch = useDispatch();

  const [select, setSelect] = useState([]);

  const posts = useSelector((state) =>
    postSlice.posts({
      state: state,
      page: "user",
      index: "companys",
    })
  );

  const hit = useSelector((state) =>
    postSlice.hit({
      state: state,
      page: "user",
      index: "companys",
    })
  );

  useEffect(() => {
    user.home.length && setSelect(user.home);
  }, [user.home]);

  useEffect(() => {
    !posts.length &&
      user.follows.length &&
      dispatch(
        userPosts({
          index: "companys",
          uid: user.uid,
          uids: user.follows,
        })
      );
  }, [dispatch, posts, user.follows, user.uid]);

  const handleClose = () => {
    dispatch(userSlice.handleModal({ open: false }));
  };

  const handleEdit = () => {
    dispatch(userSlice.updateHome(select));
    dispatch(postSlice.handleControl());
    dispatch(userSlice.handleModal({ open: false }));
  };

  const handleDelete = () => {
    setSelect([]);
  };

  const selectUser = (uid) => {
    const found = select.find((id) => id === uid);

    select.indexOf(uid) < 0 && !found
      ? setSelect([uid, ...select])
      : setSelect(select.filter((id) => id !== uid));
  };

  return (
    <div className={styles.home}>
      <Header
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        select={select}
      />

      <Select select={select} />

      <List
        user={user}
        posts={posts}
        hit={hit}
        select={select}
        selectUser={selectUser}
      />
    </div>
  );
};