import styles from "../Person.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export const Urls = ({ user }) => {
  const urls = user?.profile?.urls;
  const dummy = [
    "https://dummy.com",
    "https://zettai-misenasen.co.jp",
    "https://mireru-wakega-nai.net",
    "https://sadako.github.io/portfolio",
    "https://sonnani_mitaino.net",
    "https://koreo-mitara-sinu.me",
    "https://dame_zettai.com",
  ];

  return urls !== "非公開" ? (
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
  ) : (
    <div className={`${styles.profile_col} ${styles.profile_col_url}`}>
      {[...Array(Math.floor(Math.random() * 3 + 1))]
        .map(
          () =>
            [...dummy].splice(
              Math.floor(Math.random() * [...dummy].length),
              1
            )[0]
        )
        .map(
          (url, index) =>
            url && (
              <div className={styles.profile_field} key={index}>
                <FontAwesomeIcon
                  icon={faLink}
                  className={styles.profile_icon}
                />
                <a
                  href={url}
                  className={`${styles.profile_link} ${styles.profile_link_dummy}`}
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
