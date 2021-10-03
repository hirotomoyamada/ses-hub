import styles from "../../../Profile.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

export const CreateAt = ({ user }) => {
  const timestamp = (t) => {
    const unix = new Date(t);
    const year = unix.getFullYear();
    const month = ("0" + (unix.getMonth() + 1)).slice(-2);
    return `${year}年${month}月`;
  };

  return (
    <div className={styles.profile_createAt}>
      <FontAwesomeIcon
        icon={faCalendarAlt}
        className={styles.profile_icon}
      />
      <span>
        {timestamp(user?.createAt)}
        からSES_HUBを利用しています
      </span>
    </div>
  );
};
