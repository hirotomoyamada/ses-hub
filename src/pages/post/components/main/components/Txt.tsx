import React from "react";
import styles from "../Main.module.scss";

import { Matter } from "types/post";

interface PropType {
  tag: string;
  txt: string | number | Matter["location"];
  none?: boolean;
  end?: string;
  txtarea?: boolean;
}

export const Txt: React.FC<PropType> = ({ tag, txt, none, end, txtarea }) => {
  return txt ? (
    <div className={`${styles.main_col} ${none && styles.main_col_none}`}>
      <span className={styles.main_tag}>{tag}</span>
      <p className={txtarea ? styles.main_txtarea : undefined}>
        {`${
          typeof txt === "string" || typeof txt === "number"
            ? txt
            : `${txt.area} ${txt.place}`
        }
        ${end && txt !== "その他" ? end : ""}`}
      </p>
    </div>
  ) : (
    <></>
  );
};
