import React from "react";
import styles from "./Title.module.scss";

import { Matter, Resource } from "types/post";

interface PropType {
  post: Matter | Resource;
  resources?: boolean;
}

export const Title: React.FC<PropType> = ({ post, resources }) => {
  const newPost = post?.createAt > Date.now() - 60 * 60 * 24 * 3 * 1000;

  return !resources ? (
    <div className={styles.title}>
      <h1 className={styles.title_txt}>{(post as Matter)?.title}</h1>
      {newPost && <span className={styles.title_new}>NEW</span>}
    </div>
  ) : (
    <div className={styles.title}>
      <h1 className={styles.title_txt}>
        {(post as Resource)?.roman?.firstName?.substring(0, 1)}&nbsp;.&nbsp;
        {(post as Resource)?.roman?.lastName?.substring(0, 1)}&nbsp;
      </h1>
      {newPost && <span className={styles.title_new}>NEW</span>}
    </div>
  );
};
