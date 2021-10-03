import styles from "./Auth.module.scss";
import { Link } from "react-router-dom";

export const Auth = ({ signup, change }) => {
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
