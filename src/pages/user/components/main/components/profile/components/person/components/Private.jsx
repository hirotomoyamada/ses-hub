import styles from "../Person.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export const Private = ({ user }) => {
  return (
    <div className={styles.profile_wrap}>
      <div className={styles.profile_field}>
        <FontAwesomeIcon icon={faUser} className={styles.profile_icon} />
        <p className={styles.profile_desc}>{user?.profile?.sex}</p>
        <p className={styles.profile_desc}>
          (&nbsp;{user?.profile?.age}歳&nbsp;)
        </p>
      </div>
      <div className={styles.profile_field}>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          className={styles.profile_icon}
        />
        <p className={styles.profile_desc}>{user?.profile?.location}</p>
      </div>
    </div>
  );
};
