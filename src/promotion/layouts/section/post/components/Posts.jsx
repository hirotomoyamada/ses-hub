import styles from "../Post.module.scss";

import { Item } from "./item/Item";

export const Posts = ({ index, posts, handleOpen }) => {
  return (
    <div className={styles.post_list}>
      {posts.map((post) => (
        <button type="button" key={post.objectID} onClick={() => handleOpen()}>
          <Item index={index} post={post} />
        </button>
      ))}
    </div>
  );
};
