import styles from "../../../Profile.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLine } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const Social = ({ user, demo }) => {
  return (
    <div className={styles.profile_sns}>
      <a
        className={
          !user?.profile?.social?.line ? styles.profile_sns_disabled : ""
        }
        href={
          !demo &&
          `https://line.me/ti/p/${
            user?.profile?.social?.line && user?.profile?.social?.line
          }`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faLine}
          className={`${styles.profile_sns_icon} ${
            user?.profile?.social?.line && styles.profile_sns_icon_line
          }`}
        />
      </a>

      <a
        className={
          !user?.profile?.social?.twitter ? styles.profile_sns_disabled : ""
        }
        href={
          !demo &&
          `https://twitter.com/${
            user?.profile?.social?.twitter && user?.profile?.social?.twitter
          }`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faTwitterSquare}
          className={`${styles.profile_sns_icon} ${
            user?.profile?.social?.twitter && styles.profile_sns_icon_twitter
          }`}
        />
      </a>

      <a
        className={
          !user?.profile?.social?.instagram ? styles.profile_sns_disabled : ""
        }
        href={
          !demo &&
          `https://instagram.com/${
            user?.profile?.social?.instagram && user?.profile?.social?.instagram
          }`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faInstagramSquare}
          className={`${styles.profile_sns_icon} ${
            user?.profile?.social?.instagram &&
            styles.profile_sns_icon_instagram
          }`}
        />
      </a>

      <a
        className={
          !user?.profile?.social?.linkedIn ? styles.profile_sns_disabled : ""
        }
        href={
          !demo &&
          `https://linkedin.com/in/${
            user?.profile?.social?.linkedIn && user?.profile?.social?.linkedIn
          }`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faLinkedin}
          className={`${styles.profile_sns_icon} ${
            user?.profile?.social?.linkedIn && styles.profile_sns_icon_linkedIn
          }`}
        />
      </a>
    </div>
  );
};
