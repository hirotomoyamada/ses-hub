import styles from "../Main.module.scss";

export const Body = ({ post }) => {
  return (
    <div
      className={`${styles.main_body} ${
        !post?.profile?.body && styles.main_body_none
      }`}
    >
      <p
        className={`${styles.main_body_txt} ${
          !post?.profile?.body && styles.main_body_txt_none
        }`}
      >
        {post?.profile?.body ? post?.profile?.body : "まだ記入がありません"}
      </p>
    </div>
  );
};
