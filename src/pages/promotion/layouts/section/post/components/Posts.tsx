import React from "react";
import { Matter, Resource } from "types/post";
import styles from "../Post.module.scss";

import { Item } from "./item/Item";

interface PropType {
  index: "matters" | "resources";
  posts: Matter[] | Resource[];
  handleOpen: () => void;
}

export const Posts: React.FC<PropType> = ({ index, posts, handleOpen }) => {
  return (
    <div className={styles.post_list}>
      {posts?.map((post) => (
        <button type="button" key={post.objectID} onClick={() => handleOpen()}>
          <Item index={index} post={post} />
        </button>
      ))}
    </div>
  );
};
