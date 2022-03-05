import React from "react";
import styles from "../Item.module.scss";

import { Matter, Resource } from "types/post";

interface PropType {
  post: Matter | Resource;
}

export const Handles: React.FC<PropType> = ({ post }) => {
  const handles = post?.handles;
  return (
    <div className={handles && styles.item_tags}>
      {handles?.[0] &&
        handles.map(
          (handle, index) =>
            handle && (
              <div className={styles.item_tags_tag} key={index}>
                <h3>{handle}</h3>
              </div>
            )
        )}
    </div>
  );
};
