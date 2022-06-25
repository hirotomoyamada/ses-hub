import React from "react";
import styles from "./Item.module.scss";
import { Matters } from "./components/Matters";
import { Resources } from "./components/Resources";
import { Matter, Resource } from "types/post";

interface PropType {
  index: "matters" | "resources";
  post: Matter | Resource;
}

export const Item: React.FC<PropType> = ({ index, post }) => {
  return (
    <div className={styles.item}>
      {index === "matters" ? (
        <Matters post={post as Matter} />
      ) : (
        index === "resources" && <Resources post={post as Resource} />
      )}
    </div>
  );
};
