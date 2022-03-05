import React from "react";
import styles from "./Header.module.scss";

import { At } from "./components/At";
import { Display } from "./components/Display";
import { Status } from "./components/Status";
import { Position } from "./components/Position";
import { Title } from "./components/Title";

import { Matter, Resource } from "types/post";
import { User } from "types/user";

interface PropType {
  post: Matter | Resource;
  user: User;
}

export const Header: React.FC<PropType> = ({ post, user }) => {
  return (
    <div className={styles.header}>
      <At post={post} />

      <div className={styles.header_container}>
        {post.uid === user.uid && (
          <div className={styles.header_wrap}>
            <Display post={post} />
            <Status post={post} />
          </div>
        )}

        <Position post={post} />
      </div>

      <Title post={post} />
    </div>
  );
};
