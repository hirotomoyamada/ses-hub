import React from "react";
import styles from "../Main.module.scss";

interface PropType {
  array: string[];
  acnt?: boolean;
  tag?: string;
}

export const Feilds: React.FC<PropType> = ({ acnt, tag, array }) => {
  return array?.[0] ? (
    tag ? (
      <div className={styles.main_col}>
        <span className={styles.main_tag}>{tag}</span>
        {array.map(
          (value, index) =>
            value && (
              <div key={index}>
                <h3>{value}</h3>
              </div>
            )
        )}
      </div>
    ) : (
      <div className={styles.main_row}>
        {array.map(
          (value, index) =>
            value && (
              <h3
                key={index}
                className={`${styles.main_array} ${
                  acnt && styles.main_array_acnt
                }`}
              >
                {value}
              </h3>
            )
        )}
      </div>
    )
  ) : (
    <></>
  );
};
