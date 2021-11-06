import styles from "../Company.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export const Email = ({ user, demo }) => {
  return (
    <div className={styles.profile_field}>
      <FontAwesomeIcon icon={faEnvelope} className={styles.profile_icon} />
      <a
        href={`mailto:${user?.profile?.email}`}
        className={styles.profile_link}
      >
        {!demo ? user?.profile?.email : "demo@ses-hub.app"}
      </a>
    </div>
  );
};
