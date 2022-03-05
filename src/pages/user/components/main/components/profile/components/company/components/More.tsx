import React from "react";
import styles from "../Company.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { Company } from "types/post";

interface PropType {
  user: Company;
}

export const More: React.FC<PropType> = ({ user }) => {
  return user?.profile?.more?.[0] || user?.profile?.region?.[0] ? (
    <div className={styles.profile_field}>
      <FontAwesomeIcon
        icon={faThumbsUp as IconProp}
        className={styles.profile_icon}
      />

      <p className={styles.profile_address}>
        私は、
        {user?.profile?.more?.[0] && (
          <span className={styles.profile_postal}>
            {user?.profile?.more}
            {user?.profile?.region?.[0] ? "が多く" : "が多い"}
          </span>
        )}
        {user?.profile?.region?.map((value, index) =>
          index === 0 ? `${value}` : `・${value}`
        )}
        {user?.profile?.region?.[0] && "が得意"}
      </p>
    </div>
  ) : (
    <></>
  );
};
