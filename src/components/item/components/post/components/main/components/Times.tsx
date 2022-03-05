import styles from "../Main.module.scss";

import ScheduleIcon from "@material-ui/icons/Schedule";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import { Matter, Resource } from "types/post";

interface PropType {
  post: Matter | Resource;
}

export const Times: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <ScheduleIcon className={styles.main_icon} />
      <div className={styles.main_field}>
        <span>
          {(post as Matter)?.times?.start}&nbsp;〜&nbsp;
          {(post as Matter)?.times?.end}
        </span>
      </div>
    </div>
  );
};

export const Period: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <CalendarTodayIcon className={styles.main_icon} />
      <div className={styles.main_field}>
        <span>
          {post?.period?.year}年&nbsp;{post?.period?.month}月&nbsp;〜
        </span>
      </div>
    </div>
  );
};
