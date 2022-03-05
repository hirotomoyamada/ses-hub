import styles from "../Main.module.scss";

import { Matter, Resource } from "types/post";

interface PropType {
  post: Matter | Resource;
}

export const Body: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.main_body}>
      <p className={styles.main_body_txt}>{post?.body}</p>
    </div>
  );
};
