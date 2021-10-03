import styles from "../Main.module.scss";

import HowToVoteIcon from "@material-ui/icons/HowToVote";

export const Costs = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <HowToVoteIcon className={styles.main_icon} />
      {post?.costs?.display !== "public" ? (
        <div className={styles.main_field}>
          <span>{post?.costs?.type}</span>
        </div>
      ) : post?.costs?.min ? (
        <div className={styles.main_field}>
          <span>
            {post?.costs?.min}万&nbsp;〜&nbsp;{post?.costs?.max}万
          </span>
        </div>
      ) : (
        <div className={styles.main_field}>
          <span>〜&nbsp;{post?.costs?.max}万</span>
        </div>
      )}
    </div>
  );
};
