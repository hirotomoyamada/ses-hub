import styles from "../Person.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

export const Resume = ({ user }) => {
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_col}>
        <span className={styles.profile_tag}>職務経歴書</span>

        <div className={`${styles.profile_file} ${!user?.resume && styles.profile_file_none}`}>
          <a
            href={user?.resume? user?.resume : "/"}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FontAwesomeIcon
              icon={faFilePdf}
              className={`${styles.profile_file_icon} ${
                !user?.resume && styles.profile_file_icon_none
              }`}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
