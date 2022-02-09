import styles from "../Main.module.scss";

import CodeIcon from "@material-ui/icons/Code";

export const Adjustment = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <CodeIcon className={styles.main_icon} />
      <span className={styles.item_cnt_txt}>{post?.adjustment}</span>
    </div>
  );
};
