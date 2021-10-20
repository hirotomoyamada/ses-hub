import styles from "../Person.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export const Urls = ({ user }) => {
  const urls = user?.profile?.urls;

  return (
    <div className={`${styles.profile_col} ${styles.profile_col_url}`}>
      {urls?.[0] &&
        urls.map(
          (url, index) =>
            url && (
              <div className={styles.profile_field} key={index}>
                <FontAwesomeIcon
                  icon={faLink}
                  className={styles.profile_icon}
                />
                <a
                  href={url}
                  className={styles.profile_link}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {url}
                </a>
              </div>
            )
        )}
    </div>
  );
};
