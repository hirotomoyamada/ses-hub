import React from "react";
import styles from "../Header.module.scss";

import { Matter, Resource } from "types/post";

interface PropType {
  post: Matter | Resource;
}

export const Display: React.FC<PropType> = ({ post }) => {
  return (
    <div
      className={`${styles.header_display} ${
        post.display === "private" && styles.header_display_private
      }`}
    >
      <span>
        {post.display === "public"
          ? "公開"
          : post.display === "private" && "非公開"}
      </span>
    </div>
  );
};
