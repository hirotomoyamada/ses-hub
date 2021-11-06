import styles from "../Company.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

export const Tel = ({ user, demo }) => {
  return user?.profile?.tel ? (
    <div className={styles.profile_field}>
      <FontAwesomeIcon icon={faPhoneAlt} className={styles.profile_icon} />
      <a href={`tel:${user?.profile?.tel}`} className={styles.profile_link}>
        {!demo ? user?.profile?.tel : "0X0-XXXX-XXXX"}
      </a>
    </div>
  ) : (
    <></>
  );
};
