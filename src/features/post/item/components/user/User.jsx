import { Header } from "./header/Header";
import styles from "./User.module.scss";

export const User = ({ index, post }) => {
  return (
    <div className={styles.user}>
      <Header post={post} />

      {post?.profile?.body && (
        <p className={styles.user_body}>{post?.profile?.body}</p>
      )}
    </div>
  );
};
