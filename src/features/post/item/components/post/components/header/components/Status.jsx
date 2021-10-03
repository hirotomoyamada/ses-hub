import styles from "../Header.module.scss";

export const Status = ({ post }) => {
  return (
    <div
      className={`${styles.header_status} ${
        post?.status === "保留中"
          ? styles.header_status_reserve
          : post?.status === "提案中"
          ? styles.header_status_propo
          : post?.status === "面談中"
          ? styles.header_status_interview
          : post?.status === "フォロー中"
          ? styles.header_status_follow
          : post?.status === "成約" && styles.header_status_end
      }`}
    >
      <h2 className={styles.header_status_txt}>{post?.status}</h2>
    </div>
  );
};
