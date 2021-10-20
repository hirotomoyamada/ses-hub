import styles from "../Person.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export const Email = ({ user }) => {
  return (
    <div className={styles.profile_field}>
      <FontAwesomeIcon icon={faEnvelope} className={styles.profile_icon} />
      <a
        href={`mailto:${user?.profile?.email}`}
        className={styles.profile_link}
      >
        {user?.profile?.email}
      </a>
    </div>
  );
};
