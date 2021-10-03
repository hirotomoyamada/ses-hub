import styles from "../../../Profile.module.scss";

export const Head = ({ user }) => {
  return (
    <div>
      <h1 className={styles.profile_person}>
        {user?.profile?.person}
      </h1>

      <h2 className={styles.profile_name}>{user?.profile?.name}</h2>
    </div>
  );
};
