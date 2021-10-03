import styles from "../Success.module.scss";

export const Header = ({ load }) => {
  return (
    <div className={styles.success_header}>
      {load ? "処理中..." : "お支払いが完了しました！"}
    </div>
  );
};
