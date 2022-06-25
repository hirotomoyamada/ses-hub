import React from "react";
import styles from "../Success.module.scss";

interface PropType {
  load: boolean | undefined;
}

export const Header: React.FC<PropType> = ({ load }) => {
  return (
    <div className={styles.success_header}>
      {load ? "処理中..." : "お支払いが完了しました！"}
    </div>
  );
};
