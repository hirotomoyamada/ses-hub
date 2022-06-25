import React, { useEffect, useState } from "react";
import styles from "./Follow.module.scss";

import { useDispatch } from "react-redux";
import * as userSlice from "features/user/userSlice";

import { Company } from "types/post";
import { User } from "types/user";

interface PropType {
  user: User;
  post: Company;
  profile?: boolean;
  select?: string[];
  selectUser?: (uid: string) => void;
}

export const Follow: React.FC<PropType> = ({
  user,
  post,
  profile,
  select,
  selectUser,
}) => {
  const dispatch = useDispatch();

  const [follow, setFollow] = useState(false);
  const [target, setTarget] = useState(false);

  useEffect(() => {
    const follows: string[] = user?.follows;

    setFollow(follows.indexOf(post?.uid) >= 0 ? true : false);
    select && setTarget(select.indexOf(post?.uid) >= 0 ? true : false);
  }, [post?.uid, select, user?.follows]);

  const handleFollow = () => {
    dispatch(
      !follow ? userSlice.addFollow(post) : userSlice.removeFollow(post)
    );
  };

  return user?.payment?.status !== "canceled" &&
    user?.uid !== post?.uid &&
    !select ? (
    <button
      type="button"
      onClick={handleFollow}
      className={`${styles.follow} ${follow && styles.follow_followed} ${
        profile && styles.follow_profile
      }`}
    >
      {!follow ? "フォローする" : "フォロー中"}
    </button>
  ) : user?.payment?.status !== "canceled" ? (
    <button
      type="button"
      onClick={() => selectUser && selectUser(post.uid)}
      className={`${styles.follow} ${target && styles.follow_remove} ${
        !target && select && select.length >= 15 && styles.follow_disable
      }`}
    >
      {!target ? "未選択" : "解除"}
    </button>
  ) : (
    <></>
  );
};
