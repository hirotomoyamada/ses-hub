import styles from "./Operation.module.scss";

export const Operation = ({
  post,
  sort,
  open,
  handleSortChange,
  handleEdit,
  handleVerification,
  handleOpen,
}) => {
  open && window.addEventListener("scroll", handleOpen);

  return (
    <div>
      {sort && (
        <div className={`${styles.operation} ${styles.operation_sort}`}>
          <button
            onClick={() =>
              handleSortChange({ target: "createAt", type: "desc" })
            }
            className={styles.operation_btn}
          >
            新着順
          </button>
          <button
            onClick={() =>
              handleSortChange({ target: "updateAt", type: "desc" })
            }
            className={styles.operation_btn}
          >
            更新順
          </button>
        </div>
      )}
      {post && (
        <div className={styles.operation}>
          <button onClick={handleEdit} className={styles.operation_btn}>
            編集
          </button>
          <button
            onClick={handleVerification}
            className={`${styles.operation_btn} ${styles.operation_btn_remove}`}
          >
            削除
          </button>
        </div>
      )}
      {open && (
        <div onClick={handleOpen} className={styles.operation_overlay}></div>
      )}
    </div>
  );
};
