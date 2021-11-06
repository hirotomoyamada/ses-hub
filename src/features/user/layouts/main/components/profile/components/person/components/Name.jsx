import styles from "../Person.module.scss";

export const Name = ({ user }) => {
  return (
    <div className={styles.profile_col}>
      <span className={styles.profile_tag}>氏名</span>
      <span className={`${user?.request !== "enable" && styles.profile_dummy}`}>
        {user?.profile?.name}
      </span>
    </div>
  );
};
