import styles from "../Main.module.scss";

import BusinessIcon from "@material-ui/icons/Business";

export const Remote = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <BusinessIcon className={styles.main_icon} />
      <span>
        {post?.remote === "あり"
          ? "リモート"
          : post?.remote === "なし"
          ? "常駐"
          : post?.remote}
      </span>
    </div>
  );
};

export const Belong = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <BusinessIcon className={styles.main_icon} />
      <span>{post?.belong}</span>
    </div>
  );
};
