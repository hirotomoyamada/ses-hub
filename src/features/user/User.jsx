import styles from "./User.module.scss";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { userPosts } from "../post/actions/userPosts";

import { Main } from "./layouts/main/Main";
import { Side } from "./layouts/side/Side";
import { Meta } from "./Meta";
import { useResize } from "./hook/useResize";
import { usePosts } from "./hook/usePosts";
import { useUser } from "./hook/useUser";

export const User = ({ index, uid }) => {
  const dispatch = useDispatch();

  const [currentUser, user] = useUser(index, uid);
  const [posts, hit, sort] = usePosts(index, uid);
  const [main, open, setOpen] = useResize();

  useEffect(() => {
    index?.post !== "persons" &&
      index?.user === "companys" &&
      (index?.post !== "companys" || user?.follows?.length) &&
      (!posts?.length || sort?.control) &&
      dispatch(
        userPosts({
          index: index?.post,
          uid: uid,
          uids: index?.post === "companys" && user?.follows,
          status: sort?.status,
          display: sort?.display,
        })
      );
  }, [
    dispatch,
    index,
    posts?.length,
    uid,
    user?.follows,
    sort?.control,
    sort?.status,
    sort?.display,
  ]);

  return Object.keys(user)?.length ? (
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
        currentUser={currentUser}
        user={user}
        posts={posts}
        hit={hit}
        sort={sort}
        open={open}
        setOpen={setOpen}
      />
    </div>
  ) : (
    <></>
  );
};
