import React, { useState } from "react";
import styles from "../Main.module.scss";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { User } from "types/user";

interface PropType {
  user: User;
}

export const Uid: React.FC<PropType> = ({ user }) => {
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  return (
    <div className={styles.main_col}>
      <span className={styles.main_tag}>ユーザーID</span>
      <CopyToClipboard text={user?.uid} onCopy={handleCopy}>
        <button
          type="button"
          className={`
            ${styles.main_value} 
            ${styles.main_value_id} 
            ${copy && styles.main_value_copy}
          `}
        >
          {user?.uid}
        </button>
      </CopyToClipboard>
    </div>
  );
};
