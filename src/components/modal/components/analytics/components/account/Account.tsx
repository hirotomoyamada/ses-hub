import React from "react";
import styles from "./Account.module.scss";
import { User } from "types/user";
import { Company } from "types/post";

interface PropType {
  user: User;
  selectUser: Company[];
  uid: string;
  setUid: React.Dispatch<React.SetStateAction<string>>;
}

export const Account: React.FC<PropType> = ({
  user,
  selectUser,
  uid,
  setUid,
}) => {
  return selectUser.length ? (
    <div className={styles.account}>
      <button
        type="button"
        className={`
            ${styles.account_btn} 
            ${uid === user.uid && styles.account_btn_current}
          `}
        onClick={() => setUid(user.uid)}
      >
        自分
      </button>

      {selectUser.map((user) => (
        <button
          key={user.uid}
          type="button"
          className={`
            ${styles.account_btn} 
            ${uid === user.uid && styles.account_btn_current}
          `}
          onClick={() => setUid(user.uid)}
        >
          {user.profile.person}
        </button>
      ))}
    </div>
  ) : (
    <></>
  );
};
