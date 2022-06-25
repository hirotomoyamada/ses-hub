import styles from "../Header.module.scss";

import { Matter, Resource } from "types/post";

interface PropType {
  post: Matter | Resource;
}

export const Position: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.header_position}>
      <h2 className={styles.header_position_txt}>{post?.position}</h2>
    </div>
  );
};
