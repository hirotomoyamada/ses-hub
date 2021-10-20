import styles from "../Main.module.scss";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

export const Period = ({ post }) => {
  return post?.profile?.period?.year && post?.profile?.period?.month ? (
    <div className={styles.main_wrap}>
      <CalendarTodayIcon className={styles.main_icon} />
      <div className={styles.main_field}>
        <span>
          {post?.profile?.period.year}年&nbsp;{post?.profile?.period.month}
          月&nbsp;〜
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
};
