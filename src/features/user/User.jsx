import styles from "./User.module.scss";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchUser } from "./actions/fetchUser";
import { userPosts } from "../post/actions/userPosts";
import * as rootSlice from "../root/rootSlice";
import * as postSlice from "../post/postSlice";
import * as userSlice from "./userSlice";

import { Main } from "./layouts/main/Main";
import { Side } from "./layouts/side/Side";
import { Meta } from "./Meta";

export const User = ({ type, uid }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const index = useSelector(rootSlice.index);

  const currentUser = useSelector(userSlice.user);
  const selectUser = useSelector(userSlice.selectUser);
  const user =
    currentUser?.uid === uid
      ? currentUser
      : selectUser?.uid === uid && selectUser;

  const main = useRef();

  const [open, setOpen] = useState(false);

  const posts = useSelector((state) =>
    postSlice.posts({
      state: state,
      page:
        type === "companys"
          ? currentUser?.uid === uid
            ? "user"
            : "selectUser"
          : "bests",
      index: index,
    })
  );

  const hit = useSelector((state) =>
    postSlice.hit({
      state: state,
      page:
        type === "companys" && currentUser?.uid === uid ? "user" : "selectUser",
      index: index,
    })
  );

  const sort = useSelector(rootSlice.sort);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(rootSlice.handlePage("user"));
  }, [dispatch, pathname]);

  useEffect(() => {
    if (currentUser?.uid !== uid && selectUser?.uid !== uid) {
      dispatch(fetchUser({ index: type, uid: uid }));
    }

    if (currentUser?.uid === uid && index === "persons") {
      dispatch(rootSlice.handleIndex("matters"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, type, uid]);

  useEffect(() => {
    index !== "persons" &&
      type === "companys" &&
      (index !== "companys" || user?.follows?.length) &&
      (!posts?.length || sort.control) &&
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
    posts?.length,
    sort.control,
    sort.display,
    sort.status,
    type,
    uid,
    user?.follows,
  ]);

  useEffect(() => {
    const resize = () => {
      window.innerWidth < 1440 && setOpen(false);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={styles.user}>
      <Meta index={index} user={user} />

      {!open && (
        <Main
          main={main}
          index={type}
          uid={uid}
          user={user}
          currentUser={currentUser}
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
    </div>
  );
};
