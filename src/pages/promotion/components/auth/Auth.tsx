import React from "react";
import styles from "./Auth.module.scss";
import { Link } from "react-router-dom";

interface PropType {
  signup?: boolean;
  change?: boolean;
}

export const Auth: React.FC<PropType> = ({ signup, change }) => {
  return (
    <Link to={`/${signup ? "signup" : "login"}`}>
      <div
        className={`${styles.auth} ${change && styles.auth_change} ${
          change && signup && styles.auth_change_signup
        }`}
      >
        {signup ? "新規登録" : "ログイン"}
      </div>
    </Link>
  );
};
