import React, { useEffect } from "react";
import styles from "./User.module.scss";

import { useUser } from "hooks/useUser";
import { useUserPosts } from "hooks/useUserPosts";
import { useUserResize } from "hooks/useUserResize";

import { useDispatch } from "react-redux";
import { userPosts } from "features/post/actions";

import { Main } from "./components/main/Main";
import { Side } from "./components/side/Side";
import { Meta } from "./Meta";

interface PropType {
  index: {
    user: "companys" | "persons";
    post: "matters" | "resources" | "companys" | "persons";
  };
  uid: string;
}

export const User: React.FC<PropType> = ({ index, uid }) => {
  const dispatch = useDispatch();

  const [currentUser, user] = useUser(index, uid);
  const [posts, hit, sort] = useUserPosts(index, uid);
  const [main, open, setOpen] = useUserResize();

  useEffect(() => {
    index?.post !== "persons" &&
      index?.user === "companys" &&
      (index?.post !== "companys" || currentUser?.follows?.length) &&
      (!posts?.length || sort?.control) &&
      dispatch(
        userPosts({
          index: index?.post,
          uid: uid,
          uids: index?.post === "companys" ? currentUser?.follows : undefined,
          status: sort?.status,
          display: sort?.display,
        })
      );
  }, [
    dispatch,
    index,
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

      {!open && (
        <Main
          main={main}
          index={index.user}
          uid={uid}
          user={user}
          currentUser={currentUser}
        />
      )}

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
    </div>
  );
};
