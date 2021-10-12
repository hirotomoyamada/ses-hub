import styles from "./Delete.module.scss";

export const Delete = ({ text, handleClose, close, handleDelete }) => {
  return (
    <div className={styles.delete}>
      {text !== "出力" && <p className={styles.delete_ttl}>{text}を削除</p>}
      <span className={styles.delete_desc}>
        {text !== "出力"
          ? `本当にこの${text}を削除してよろしいですか？`
          : "出力リストから選択した項目を削除しますか？"}
      </span>
      <div className={styles.delete_menu}>
        <button
          type="button"
          className={styles.delete_menu_cancel}
          onClick={close ? close : handleClose}
        >
          {text !== "出力" ? "キャンセル" : "削除しない"}
        </button>
        <button
          form="form"
          type={handleDelete ? "button" : "submit"}
          className={styles.delete_menu_submit}
          onClick={handleDelete ? handleDelete : undefined}
        >
          {text !== "出力" ? "削除" : "すべて削除する"}
        </button>
      </div>
    </div>
  );
};
