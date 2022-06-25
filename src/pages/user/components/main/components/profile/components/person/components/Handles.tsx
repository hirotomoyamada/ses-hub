import React from "react";
import styles from "../Person.module.scss";

import { Person } from "types/post";

interface PropType {
  user: Person;
}
export const Handles: React.FC<PropType> = ({ user }) => {
  const handles = user?.profile?.handles;

  return handles?.[0] ? (
    <div className={styles.profile_wrap}>
      {handles?.[0] &&
        handles.map(
          (handle, index) =>
            handle && (
              <div className={styles.profile_array} key={index}>
                <h3 className={styles.profile_array_txt}>{handle}</h3>
              </div>
            )
        )}
    </div>
  ) : (
    <></>
  );
};
