import styles from "../Header.module.scss";

export const Position = ({ post }) => {
  return (
    <div className={styles.header_position}>
      <h2 className={styles.header_position_txt}>{post?.position}</h2>
    </div>
  );
};
