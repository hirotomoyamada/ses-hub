import styles from "./Header.module.scss";

export const Header = ({ handleClose }) => {
  return (
    <div className={styles.header}>
      <button
        type="button"
        className={styles.header_cancel}
        onClick={handleClose}
      >
        キャンセル
      </button>
    </div>
  );
};
