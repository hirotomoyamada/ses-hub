import React from "react";
import styles from "../Main.module.scss";

import { Matter, Resource } from "types/post";

interface PropType {
  memo: Matter["memo"] | Resource["memo"];
  index: "matters" | "resources";
}

export const Memo: React.FC<PropType> = ({ memo, index }) => {
  return index === "matters" && memo ? (
    <div className={`${styles.main_memo} ${styles.main_memo_body}`}>
      <span className={styles.main_memo_tag}>
        メモ
        <span className={styles.main_memo_tag_desc}>&nbsp;（非公開）</span>
      </span>

      <div>
        <p className={`${styles.main_memo_txt} ${styles.main_memo_txt_body}`}>
          {memo}
        </p>
      </div>
    </div>
  ) : index === "resources" &&
    ((memo as Resource["memo"])?.name ||
      (memo as Resource["memo"])?.tel ||
      (memo as Resource["memo"])?.address) ? (
    <div className={styles.main_memo}>
      <span className={styles.main_memo_tag}>
        メモ
        <span className={styles.main_memo_tag_desc}>&nbsp;（非公開）</span>
      </span>

      {(memo as Resource["memo"])?.name && (
        <div
          className={`${styles.main_memo_field} ${
            !(memo as Resource["memo"])?.tel &&
            !(memo as Resource["memo"])?.address &&
            styles.main_memo_field_none
          }`}
        >
          <span className={styles.main_memo_field_tag}>名前</span>
          <p className={styles.main_memo_txt}>
            {(memo as Resource["memo"])?.name}
          </p>
        </div>
      )}

      {(memo as Resource["memo"])?.tel && (
        <div
          className={`${styles.main_memo_field} ${
            (!(memo as Resource["memo"])?.name ||
              !(memo as Resource["memo"])?.address) &&
            styles.main_memo_field_none
          }`}
        >
          <span className={styles.main_memo_field_tag}>連絡先</span>

          <p className={styles.main_memo_txt}>
            {(memo as Resource["memo"])?.tel}
          </p>
        </div>
      )}

      {(memo as Resource["memo"])?.address && (
        <div
          className={`${styles.main_memo_field} ${styles.main_memo_field_none}`}
        >
          <span className={styles.main_memo_field_tag}>住所</span>

          <p className={styles.main_memo_txt}>
            {(memo as Resource["memo"])?.address}
          </p>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};
