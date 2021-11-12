import styles from "./Load.module.scss";

import Loader from "react-loader-spinner";

export const Load = ({ create }) => {
  return (
    <div className={styles.load}>
      <div
        className={`${styles.load_ttl} ${!create && styles.load_ttl_delete}`}
      >
        <span>{create ? "アカウント作成中" : "アカウント削除中"}</span>
        <Loader
          className={styles.load_ttl_icon}
          type="Oval"
          color={create ? "#49b757" : "#e94235db"}
          height={26}
          width={26}
        />
      </div>

      <span className={styles.load_desc}>
        ページを更新したり、閉じたりしないでください
        <br />
        {create ? "作成" : "削除"}
        が中断してしまうと、
        <span className={styles.load_desc_acnt}>
          アカウント情報が破損する可能性があります
        </span>
      </span>

      <span className={styles.load_desc}>
        {create ? "作成" : "削除"}
        が完了すると、ポップアップは自動的に閉じます
      </span>
    </div>
  );
};
