import styles from "../Main.module.scss";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as rootSlice from "../../../../../features/root/rootSlice";

export const Editor = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSetting = () => {
    history.push("/setting");
  };
  
  return (
    <div className={styles.main_edit}>
      <button
        type="button"
        onClick={handleSetting}
        className={`${styles.main_edit_btn} ${styles.main_edit_btn_account}`}
      >
        アカウント情報
      </button>

      <button
        type="button"
        onClick={() => dispatch(rootSlice.handleModal({ type: "profile" }))}
        className={styles.main_edit_btn}
      >
        プロフィール変更
      </button>
    </div>
  );
};
