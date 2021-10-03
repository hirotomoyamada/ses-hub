import styles from "../Header.module.scss";

export const Display = ({ post }) => {
  return (
    <div
      className={`${styles.header_display} ${
        post?.display === "private" && styles.header_display_private
      }`}
    >
      <span className={styles.header_display_txt}>
        {post?.display === "public"
          ? "公開"
          : post?.display === "private" && "非公開"}
      </span>
    </div>
  );
};
