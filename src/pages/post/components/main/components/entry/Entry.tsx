import React from "react";
import styles from "./Entry.module.scss";

import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

import { Matter, Resource } from "types/post";
import { User } from "types/user";

interface PropType {
  post: Matter | Resource;
  user: User;
  entry: boolean;
  handleEntry: () => void;
}

export const Entry: React.FC<PropType> = ({
  post,
  user,
  entry,
  handleEntry,
}) => {
  const demo = useSelector(rootSlice.verified).demo;

  return post?.user?.uid !== user?.uid ? (
    <button
      className={`${styles.entry} ${demo && styles.entry_disabled}`}
      onClick={handleEntry}
    >
      {demo
        ? "問い合わせすることができません"
        : entry
        ? "問い合わせ済みです"
        : "問い合わせをする"}
    </button>
  ) : (
    <></>
  );
};
