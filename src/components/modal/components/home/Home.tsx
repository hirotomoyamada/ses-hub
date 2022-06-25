import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { userPosts } from "features/post/actions";

import * as postSlice from "features/post/postSlice";
import * as userSlice from "features/user/userSlice";

import { List } from "components/list/List";

import { Header } from "./components/header/Header";
import { Select } from "./components/select/Select";

import { User } from "types/user";

interface PropType {
  user: User;
  handleClose: () => void;
}

export const Home: React.FC<PropType> = ({ user, handleClose }) => {
  const dispatch = useDispatch();

  const [select, setSelect] = useState<string[]>([]);

  const posts = useSelector((state: RootState) =>
    postSlice.posts({
      state: state,
      page: "user",
      index: "companys",
    })
  );

  const hit = useSelector((state: RootState) =>
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
    !posts?.length &&
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

  const selectUser = (uid: string) => {
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
