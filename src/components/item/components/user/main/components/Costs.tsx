import React from "react";
import styles from "../Main.module.scss";

import HowToVoteIcon from "@material-ui/icons/HowToVote";

import { Person } from "types/post";

interface PropType {
  post: Person;
}

export const Costs: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <HowToVoteIcon className={styles.main_icon} />
      {post?.profile?.costs?.display !== "public" ? (
        <div className={styles.main_field}>
          <span>{post?.profile?.costs?.type}</span>
        </div>
      ) : post?.profile?.costs?.min ? (
        <div className={styles.main_field}>
          <span>
            {post?.profile?.costs?.min}万&nbsp;〜&nbsp;
            {post?.profile?.costs?.max}万
          </span>
        </div>
      ) : (
        <div className={styles.main_field}>
          <span>〜&nbsp;{post?.profile?.costs?.max}万</span>
        </div>
      )}
    </div>
  );
};
