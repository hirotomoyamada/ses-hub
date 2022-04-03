import React, { useEffect } from "react";
import styles from "./User.module.scss";

import { useUser } from "hooks/useUser";
import { useUserPosts } from "hooks/useUserPosts";
import { useUserResize } from "hooks/useUserResize";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userPosts } from "features/post/actions";

import { Main } from "./components/main/Main";
import { Side } from "./components/side/Side";
import { Meta } from "./Meta";

import * as rootSlice from "features/root/rootSlice";

interface PropType {
  index: "companys" | "persons";
}

export const User: React.FC<PropType> = (props) => {
  const dispatch = useDispatch();
  const { uid } = useParams<{ uid: string }>();

  const index = {
    user: props.index,
    post: useSelector(rootSlice.index),
  };

  const [currentUser, user] = useUser(index, uid);
  const [posts, hit, sort] = useUserPosts(index, uid);
  const [main, open, setOpen] = useUserResize();

  useEffect(() => {
    if (index.post === "companys" && currentUser.uid !== uid) {
      dispatch(rootSlice.handleIndex("matters"));
    } else if (index.user === "persons" && index.post !== "persons") {
      dispatch(rootSlice.handleIndex("persons"));
    }
  }, [index]);

  useEffect(() => {
    index.post &&
      uid &&
      index.post !== "persons" &&
      index.user === "companys" &&
      (index.post !== "companys" || currentUser?.follows?.length) &&
      (!posts?.length || sort?.control) &&
      dispatch(
        userPosts({
          index: index.post,
          uid: uid,
          uids: index?.post === "companys" ? currentUser?.follows : undefined,
          status: sort?.status,
          display: sort?.display,
        })
      );
  }, [
    dispatch,
    index.post,
    posts?.length,
    uid,
    currentUser?.follows,
    sort?.control,
    sort?.status,
    sort?.display,
  ]);

  return (
    <div className={styles.user}>
      <Meta index={index.user} user={user} />

      {!open && uid && (
        <Main
          main={main}
          index={index.user}
          uid={uid}
          user={user}
          currentUser={currentUser}
        />
      )}

      {uid && index.post && (
        <Side
          index={index.post}
          main={main}
          uid={uid}
          user={currentUser}
          posts={posts}
          hit={hit}
          sort={sort}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};
