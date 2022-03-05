import React from "react";
import styles from "./Header.module.scss";

import { Display } from "./components/Display";
import { Position } from "./components/Position";
import { Status } from "./components/Status";
import { Handles } from "./components/Handles";

import { Matter, Resource } from "types/post";
import { User } from "types/user";

interface PropType {
  post: Matter | Resource;
  user: User;
  display?: boolean;
  status?: boolean;
}

export const Header: React.FC<PropType> = ({ post, user, display, status }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        {(display || status) && post.uid === user.uid && (
          <div className={styles.header_wrap}>
            <Display post={post} />
            <Status post={post} />
          </div>
        )}

        <Position post={post} />
      </div>

      <Handles post={post} />
    </div>
  );
};
