import React from "react";
import styles from "../Main.module.scss";

import { User } from "types/user";

interface PropType {
  user: User;
  password: boolean;
  setPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Password: React.FC<PropType> = ({
  user,
  password,
  setPassword,
}) => {
  return (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>パスワード</span>
        {user?.provider && user.provider.indexOf("password") < 0 && (
          <span className={styles.main_desc}>
            メールログインを有効にする必要があります
          </span>
        )}
        {user?.type === "child" && (
          <span className={styles.main_desc}>
            このアカウントでは変更することはできません
          </span>
        )}
      </div>
      <button
        className={`${styles.main_btn} ${
          (user?.type === "child" ||
            (user?.provider && user.provider.indexOf("password") < 0)) &&
          styles.main_btn_disabled
        }`}
        type="button"
        onClick={() => setPassword(!password)}
      >
        変更
      </button>
    </div>
  );
};
