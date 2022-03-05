import React from "react";
import styles from "../Main.module.scss";

import { Matter, Resource } from "types/post";

interface PropType {
  costs: Matter["costs"] | Resource["costs"];
}

export const Costs: React.FC<PropType> = ({ costs }) => {
  return (
    <div className={styles.main_col}>
      <div className={styles.main_field}>
        <span className={styles.main_tag}>単価</span>
        {costs?.display !== "public" ? (
          <p>{costs?.type}</p>
        ) : costs?.min ? (
          <p>
            {costs?.min}万&nbsp;〜&nbsp;{costs?.max}万
          </p>
        ) : (
          <p>〜&nbsp;{costs?.max}万</p>
        )}
      </div>

      {costs?.contract ? (
        <div className={styles.main_memo_costs}>
          <span className={styles.main_memo_costs_tag}>
            請負単価
            <span className={styles.main_memo_tag_desc}>&nbsp;（非公開）</span>
          </span>

          <p className={styles.main_memo_costs_txt}>{costs?.contract}万</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
