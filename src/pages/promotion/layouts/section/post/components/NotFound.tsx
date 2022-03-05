import React from "react";
import styles from "../Post.module.scss";

import Loader from "react-loader-spinner";

interface PropType {
  index: "matters" | "resources";
  load: boolean;
}

export const NotFound: React.FC<PropType> = ({ index, load }) => {
  return (
    <div className={styles.post_list_none}>
      {load ? (
        <Loader type="Oval" color="#ff9900" height={56} width={56} />
      ) : (
        <span className={styles.post_list_none_message}>
          {index === "matters"
            ? "案件情報がありません"
            : index === "resources" && "人材情報がありません"}
        </span>
      )}
    </div>
  );
};
