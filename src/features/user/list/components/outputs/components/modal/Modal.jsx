import styles from "./Modal.module.scss";

export const Modal = ({ open, handleClose, handleDelete }) => {
  return (
    <div
      className={open ? styles.open : styles.close}
    >
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <span>出力リストから選択した項目を削除しますか？</span>
        <div className={styles.modal_menu}>
          <button
            type="button"
            onClick={handleClose}
            className={styles.modal_menu_cancel}
          >
            削除しない
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={styles.modal_menu_btn}
          >
            すべて削除する
          </button>
        </div>
      </div>
    </div>
  );
};
