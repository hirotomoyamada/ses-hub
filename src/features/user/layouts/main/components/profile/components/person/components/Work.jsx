import styles from "../Person.module.scss";

export const Work = ({ user }) => {
  return user?.profile?.resident ||
    user?.profile?.working ||
    user?.profile?.clothes ? (
    <div className={styles.profile_wrap}>
      {user?.profile?.resident && (
        <div className={`${styles.profile_array} ${styles.profile_array}`}>
          <span className={styles.profile_array_txt}>
            {user?.profile?.resident}
          </span>
        </div>
      )}
      {user?.profile?.working && (
        <div className={`${styles.profile_array} ${styles.profile_array}`}>
          <span className={styles.profile_array_txt}>
            {user?.profile?.working}日&nbsp;/&nbsp;週
          </span>
        </div>
      )}
      {user?.profile?.clothes && (
        <div className={`${styles.profile_array} ${styles.profile_array}`}>
          <span className={styles.profile_array_txt}>
            {user?.profile?.clothes}
          </span>
        </div>
      )}
      &nbsp;
    </div>
  ) : (
    <></>
  );
};
