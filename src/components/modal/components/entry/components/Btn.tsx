import React from "react";
import styles from "../Entry.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLine } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { Company, Matter, Resource } from "types/post";

interface PropType {
  user: Matter["user"] | Resource["user"] | Company;
  type: "line" | "twitter" | "instagram" | "linkedIn";
  handleEntry: () => void;
}

export const Btn: React.FC<PropType> = ({ user, type, handleEntry }) => {
  const icon = {
    line: faLine as IconProp,
    twitter: faTwitterSquare as IconProp,
    instagram: faInstagramSquare as IconProp,
    linkedIn: faLinkedin as IconProp,
  };

  const url = {
    line: "https://line.me/ti/p/",
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
    linkedIn: "https://linkedin.com/in/",
  };

  return (
    <button
      onClick={handleEntry}
      className={
        !user?.profile?.social?.[type] ? styles.entry_sns_disabled : ""
      }
    >
      <a
        className={
          !user?.profile?.social?.[type] ? styles.entry_sns_disabled : ""
        }
        href={`${url[type]}${user?.profile?.social?.[type]}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={icon[type]}
          className={`${styles.entry_sns_icon} ${
            user?.profile?.social?.[type] &&
            `${styles[`entry_sns_icon_${type}`]}`
          }`}
        />
      </a>
    </button>
  );
};
