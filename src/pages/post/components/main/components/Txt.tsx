import React from "react";
import styles from "../Main.module.scss";

import { Matter } from "types/post";

interface PropType {
  tag: string;
  txt: string | number | Record<string, unknown>;
  none?: boolean;
  end?: string;
  txtarea?: boolean;
  location?: boolean;
}

export const Txt: React.FC<PropType> = ({
  tag,
  txt,
  none,
  end,
  txtarea,
  location,
}) => {
  return txt ? (
    <div className={`${styles.main_col} ${none && styles.main_col_none}`}>
      <span className={styles.main_tag}>{tag}</span>
      <p className={txtarea ? styles.main_txtarea : undefined}>
        {!location
          ? txt
          : `${(txt as Matter["location"]).area} ${
              (txt as Matter["location"]).place
            }`}
        {end && txt !== "その他" && end}
      </p>
    </div>
  ) : (
    <></>
  );
};
