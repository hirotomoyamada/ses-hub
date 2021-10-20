import styles from "../Main.module.scss";

export const Body = ({ post }) => {
  return (
    <div className={styles.main_body}>
      <p className={styles.main_body_txt}>{post?.profile?.body}</p>
    </div>
  );
};
