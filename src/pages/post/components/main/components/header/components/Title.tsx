import React from "react";
import styles from "../Header.module.scss";

import { Matter, Resource } from "types/post";

interface PropType {
  post: Matter | Resource;
}

export const Title: React.FC<PropType> = ({ post }) => {
  return (post as Matter)?.title ? (
    <h1 className={styles.header_ttl}>{(post as Matter).title}</h1>
  ) : (post as Resource)?.roman ? (
    <h1 className={styles.header_ttl}>
      {(post as Resource)?.roman?.firstName?.substring(0, 1)}&nbsp;.&nbsp;
      {(post as Resource)?.roman?.lastName?.substring(0, 1)}
    </h1>
  ) : (
    <></>
  );
};
