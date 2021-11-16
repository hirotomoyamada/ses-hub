import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.header_ttl}>グループアカウント</h1>
      <p>現在、保有しているアカウントの一覧です</p>
    </div>
  );
};
