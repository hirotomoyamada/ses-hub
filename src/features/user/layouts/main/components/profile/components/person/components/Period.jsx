import styles from "../Person.module.scss";

export const Period = ({ user }) => {
  return user?.profile?.period?.year && user?.profile?.period?.month ? (
    <div className={styles.profile_col}>
      <span className={styles.profile_tag}>稼働開始時期</span>
      <span>
        {user?.profile?.period?.year}年&nbsp;{user?.profile?.period?.month}
        月&nbsp;〜
      </span>
    </div>
  ) : (
    <></>
  );
};
