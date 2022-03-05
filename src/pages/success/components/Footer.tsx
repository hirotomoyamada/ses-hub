import React from "react";
import styles from "../Success.module.scss";

interface PropType {
  load: boolean | undefined;
  handleRedirect: (page: string) => void;
}

export const Footer: React.FC<PropType> = ({ load, handleRedirect }) => {
  return !load ? (
    <div className={styles.success_footer}>
      <button
        type="button"
        onClick={() => handleRedirect("/home")}
        className={styles.success_footer_btn}
      >
        ホーム
      </button>
      <button
        type="button"
        onClick={() => handleRedirect("/setting")}
        className={styles.success_footer_btn}
      >
        アカウント情報
      </button>
    </div>
  ) : (
    <></>
  );
};
