import styles from "./Tag.module.scss";

export const Tag = ({ tag, free, paid }) => {
  return (
    <div className={styles.tag}>
      <span className={styles.tag_name}>{tag}</span>
      {free && (
        <span className={`${styles.tag_type} ${styles.tag_type_free}`}>
          リミテッド
        </span>
      )}
      {paid && (
        <span className={`${styles.tag_type} ${styles.tag_type_paid}`}>
          レギュラー
        </span>
      )}
    </div>
  );
};
