import styles from "./Command.module.scss";

export const Command = ({
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
        <div className={`${styles.command} ${styles.command_sort}`}>
          <button
            onClick={() =>
              handleSortChange({ target: "createAt", type: "desc" })
            }
            className={styles.command_btn}
          >
            新着順
          </button>
          <button
            onClick={() =>
              handleSortChange({ target: "updateAt", type: "desc" })
            }
            className={styles.command_btn}
          >
            更新順
          </button>
        </div>
      )}
      {post && (
        <div className={styles.command}>
          <button onClick={handleEdit} className={styles.command_btn}>
            編集
          </button>
          <button
            onClick={handleVerification}
            className={`${styles.command_btn} ${styles.command_btn_remove}`}
          >
            削除
          </button>
        </div>
      )}
      {open && (
        <div onClick={handleOpen} className={styles.command_overlay}></div>
      )}
    </div>
  );
};
