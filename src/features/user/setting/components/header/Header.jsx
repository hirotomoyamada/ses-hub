import styles from "./Header.module.scss";

export const Header = ({
  handleClose,
  handleBack,
  email,
  password,
  create,
  remove,
}) => {
  return (
    <div className={styles.header}>
      <button
        type="button"
        className={styles.header_cancel}
        onClick={
          !email && !password && !create && !remove
            ? handleClose
            : handleBack
        }
      >
        もどる
      </button>
      <span className={styles.header_ttl}>アカウント情報</span>
    </div>
  );
};
