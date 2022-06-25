import React from "react";
import styles from "./Tag.module.scss";

interface PropType {
  tag: string;
  free?: boolean;
  paid?: boolean;
  option?: boolean;
}

export const Tag: React.FC<PropType> = ({ tag, free, paid, option }) => {
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

      {option && (
        <span className={`${styles.tag_type} ${styles.tag_type_option}`}>
          オプション
        </span>
      )}
    </div>
  );
};
