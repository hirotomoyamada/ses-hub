import styles from "./User.module.scss";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { showUser } from "./functions/showUser";
import { userPosts } from "../post/functions/userPosts";
import * as postSlice from "../post/postSlice";
import * as userSlice from "./userSlice";

import { Menu } from "../../components/menu/Menu";
import { Modal } from "../../components/modal/Modal";

import { Main } from "./layouts/main/Main";
import { Side } from "./layouts/side/Side";
import { Meta } from "./Meta";

export const User = ({ type, uid }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const index = useSelector(postSlice.index);

  const currentUser = useSelector(userSlice.user);
  const selectUser = useSelector(userSlice.selectUser);
  const user =
    currentUser?.uid === uid
      ? currentUser
      : selectUser?.uid === uid && selectUser;

  const main = useRef();

  const [open, setOpen] = useState(true);

  const posts = useSelector((state) =>
    postSlice.posts({
      state: state,
      page: currentUser?.uid === uid ? "user" : "selectUser",
      index: index,
    })
  );

  const hit = useSelector((state) =>
    postSlice.hit({
      state: state,
      page: currentUser?.uid === uid ? "user" : "selectUser",
      index: index,
    })
  );

  const sort = useSelector(postSlice.sort);

  useEffect(() => {
    dispatch(postSlice.handlePage("user"));
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.uid !== uid && selectUser?.uid !== uid) {
      dispatch(postSlice.resetPost("selectUser"));
      dispatch(showUser({ type: type, uid: uid }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, type, uid]);

  useEffect(() => {
    (index !== "companys" || user.follows.length) &&
      (!posts.length || sort.control) &&
      dispatch(
        userPosts({
          index: index,
          uid: uid,
          uids: index === "companys" && user?.follows,
          status: sort.status,
          display: sort.display,
        })
      );
  }, [
    dispatch,
    index,
    posts.length,
    sort.control,
    sort.display,
    sort.status,
    uid,
    user.follows,
  ]);

  useEffect(() => {
    const resize = () => {
      window.innerWidth < 1440 && setOpen(true);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    currentUser?.uid !== uid &&
      currentUser?.payment?.status === "canceled" &&
      history.push("/plan");
  }, [currentUser?.payment?.status, currentUser?.uid, history, uid]);

  return (
    <div className={styles.user}>
      <Meta user={user} />

      {open && (
        <Main
          main={main}
          uid={uid}
          user={user}
          currentUser={currentUser}
          type={type}
        />
      )}

      <Side
        index={index}
        main={main}
        uid={uid}
        currentUser={currentUser}
        user={user}
        posts={posts}
        hit={hit}
        sort={sort}
        open={open}
        setOpen={setOpen}
      />

      <Menu create user={user} />
      <Modal user={user} />
    </div>
  );
};
