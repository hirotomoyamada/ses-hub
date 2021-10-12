import styles from "./Select.module.scss";

import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ClearIcon from "@material-ui/icons/Clear";

export const Select = ({
  posts,
  outputs,
  handleOpen,
  handleOutputs,
  handleAllSelect,
  handleAllCancel,
}) => {
  return (
    <div className={styles.select}>
      {!outputs?.length ? (
        <>
          <button
            type="button"
            className={`${styles.select_btn} ${
              !posts.length && styles.select_btn_disabled
            }`}
            onClick={handleOpen}
          >
            <DoneIcon className={styles.select_btn_icon} />
            <span>選択</span>
          </button>
          <button
            type="button"
            className={`${styles.select_btn} ${
              !posts.length && styles.select_btn_disabled
            }`}
            onClick={handleAllSelect}
          >
            <DoneAllIcon className={styles.select_btn_icon} />
            <span>すべて選択</span>
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className={`${styles.select_btn} ${styles.select_btn_cancel}`}
            onClick={handleAllCancel}
          >
            <ClearIcon
              className={`${styles.select_btn_icon} ${styles.select_btn_icon_cancel}`}
            />
          </button>
          <button
            type="button"
            className={`${styles.select_btn} ${styles.select_btn_open} ${
              !outputs.length && styles.select_btn_disabled
            } `}
            onClick={handleOutputs}
          >
            出力する
          </button>
        </>
      )}
    </div>
  );
};
