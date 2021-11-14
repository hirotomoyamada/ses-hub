import styles from "./Header.module.scss";

export const Header = ({
  user,
  handleClose,
  handleBack,
  cover,
  icon,
  line,
}) => {
  return (
    <div className={styles.header}>
      <button
        type="button"
        className={`${styles.header_cancel} ${
          !user?.profile?.person &&
          !cover &&
          !icon &&
          !line &&
          styles.header_cancel_disable
        }`}
        onClick={!cover && !icon && !line ? handleClose : handleBack}
      >
        {cover || icon ? "保存" : line ? "もどる" : "キャンセル"}
      </button>
      {!cover && !icon && !line && (
        <button className={styles.header_submit} type="submit">
          保存
        </button>
      )}
    </div>
  );
};
