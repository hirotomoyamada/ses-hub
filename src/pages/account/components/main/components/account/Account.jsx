import { Btn } from "../btn/Btn";
import styles from "./Account.module.scss";

export const Account = ({ user, current }) => {
  return (
    <div className={`${styles.account} ${current && styles.account_current}`}>
      {current && (
        <span className={styles.account_txt}>あなたのアカウント</span>
      )}

      <div className={styles.account_container}>
        <span className={`${!user?.profile?.email && styles.account_txt_none}`}>
          {user?.profile?.email ? user?.profile?.email : "作成されていません"}
        </span>

        {current && <Btn plan />}

        {!current && (
          <div className={styles.account_btn}>
            {user?.profile?.email && <Btn create />}

            {!user?.profile?.email && <Btn reset />}

            {!user?.profile?.email && <Btn remove />}
          </div>
        )}
      </div>
    </div>
  );
};
