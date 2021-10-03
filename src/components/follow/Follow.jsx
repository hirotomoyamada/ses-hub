import styles from "./Follow.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as userSlice from "../../features/user/userSlice";
import * as postSlice from "../../features/post/postSlice";

export const Follow = ({ user, post, profile }) => {
  const dispatch = useDispatch();

  const [follow, setFollow] = useState(false);

  useEffect(() => {
    setFollow(user?.follows?.indexOf(post?.uid) >= 0 ? true : false);
  }, [post?.uid, user?.follows]);

  const handleFollow = () => {
    dispatch(
      !follow ? userSlice.addFollow(post.uid) : userSlice.removeFollow(post.uid)
    );
    dispatch(
      !follow ? postSlice.addFollow(post) : postSlice.removeFollow(post)
    );
  };

  return (
    user?.uid !== post?.uid && (
      <button
        onClick={handleFollow}
        className={`${styles.follow} ${follow && styles.follow_followed} ${
          profile && styles.follow_profile
        }`}
      >
        {!follow ? "フォローする" : "フォロー中"}
      </button>
    )
  );
};
