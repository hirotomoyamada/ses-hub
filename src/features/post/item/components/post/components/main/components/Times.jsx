import styles from "../Main.module.scss";

import ScheduleIcon from "@material-ui/icons/Schedule";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

export const Times = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <ScheduleIcon className={styles.main_icon} />
      <div className={styles.main_field}>
        <span>
          {post?.times?.start}&nbsp;〜&nbsp;{post?.times?.end}
        </span>
      </div>
    </div>
  );
};

export const Period = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <CalendarTodayIcon className={styles.main_icon} />
      <div className={styles.main_field}>
        <span>
          {post?.period.year}年&nbsp;{post?.period.month}月&nbsp;〜
        </span>
      </div>
    </div>
  );
};
