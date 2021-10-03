import styles from "../../../Profile.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export const Address = ({ user, demo }) => {
  return user?.profile?.postal && user?.profile?.address ? (
    <div className={styles.profile_field}>
      <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.profile_icon} />

      <p className={styles.profile_address}>
        <span className={styles.profile_postal}>{!demo ? user?.profile?.postal : "XXX-XXXX"}</span>
        {!demo ? user?.profile?.address : "デモ県デモ市デモ区デモ X-XX-XX"}
      </p>
    </div>
  ) : (
    <></>
  );
};
