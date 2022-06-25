import React from "react";
import styles from "../Company.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLine } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { Company } from "types/post";

interface PropType {
  user: Company;
  demo: boolean;
}

export const Social: React.FC<PropType> = ({ user, demo }) => {
  return user?.profile?.social ? (
    <div className={styles.profile_sns}>
      <a
        className={
          !user?.profile?.social?.line ? styles.profile_sns_disabled : ""
        }
        href={
          !demo && user?.profile?.social?.line
            ? `https://line.me/ti/p/${user.profile.social.line}`
            : undefined
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faLine as IconProp}
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
          !demo && user?.profile?.social?.twitter
            ? `https://twitter.com/${user.profile.social.twitter}`
            : undefined
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faTwitterSquare as IconProp}
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
          !demo && user?.profile?.social?.instagram
            ? `https://instagram.com/${user.profile.social.instagram}`
            : undefined
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faInstagramSquare as IconProp}
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
          !demo && user?.profile?.social?.linkedIn
            ? `https://linkedin.com/in/${user.profile.social.linkedIn}`
            : undefined
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faLinkedin as IconProp}
          className={`${styles.profile_sns_icon} ${
            user?.profile?.social?.linkedIn && styles.profile_sns_icon_linkedIn
          }`}
        />
      </a>
    </div>
  ) : (
    <></>
  );
};
