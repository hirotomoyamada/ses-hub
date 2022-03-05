import React from "react";
import styles from "./Header.module.scss";

interface PropType {
  handleClose: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  select: string[];
}

export const Header: React.FC<PropType> = ({
  handleClose,
  handleDelete,
  handleEdit,
  select,
}) => {
  return (
    <div className={styles.header}>
      <button
        type="button"
        className={styles.header_cancel}
        onClick={handleClose}
      >
        キャンセル
      </button>

      <div className={styles.header_wrap}>
        <div className={styles.header_select}>
          {select.length}&nbsp;<span>/&nbsp;15人</span>
        </div>

        <button
          className={styles.header_delete}
          type="button"
          onClick={handleDelete}
        >
          すべて解除
        </button>

        <button
          className={`${styles.header_edit} ${
            !select.length && styles.header_edit_disable
          }`}
          type="button"
          onClick={handleEdit}
        >
          保存
        </button>
      </div>
    </div>
  );
};
