import React from "react";
import styles from "../Main.module.scss";

import { Person } from "types/post";

interface PropType {
  post: Person;
}

export const Body: React.FC<PropType> = ({ post }) => {
  return (
    <div
      className={`${styles.main_body} ${
        !post?.profile?.body && styles.main_body_none
      }`}
    >
      <p
        className={`${styles.main_body_txt} ${
          !post?.profile?.body && styles.main_body_txt_none
        }`}
      >
        {post?.profile?.body ? post?.profile?.body : "まだ記入がありません"}
      </p>
    </div>
  );
};
