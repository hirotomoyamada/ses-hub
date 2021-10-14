import styles from "./Home.module.scss";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userPosts } from "../../../../features/post/actions/userPosts";
import * as postSlice from "../../../../features/post/postSlice";
import * as userSlice from "../../../../features/user/userSlice";

import { Header } from "./components/header/Header";
import { List } from "./components/List/List";
import { Select } from "./components/select/Select";

export const Home = ({ user, handleClose }) => {
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

  const handleEdit = () => {
    dispatch(userSlice.updateHome(select));
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
