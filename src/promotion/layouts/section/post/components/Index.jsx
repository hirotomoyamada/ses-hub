import styles from "../Post.module.scss";

import { useDispatch } from "react-redux";
import * as rootSlice from "../../../../../features/root/rootSlice";

export const Index = ({ index }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.post_index}>
      <button
        type="button"
        className={`${styles.post_index_btn} ${
          index === "matters" && styles.post_index_btn_current
        }`}
        onClick={() => dispatch(rootSlice.handleIndex("matters"))}
      >
        案件情報
      </button>
      <button
        type="button"
        className={`${styles.post_index_btn} ${
          index === "resources" && styles.post_index_btn_current
        }`}
        onClick={() => dispatch(rootSlice.handleIndex("resources"))}
      >
        人材情報
      </button>
    </div>
  );
};
