import styles from "../Company.module.scss";

export const Head = ({ user }) => {
  return (
    <div>
      <h1 className={styles.profile_person}>
        {user?.type !== "corporate"
          ? user?.profile?.person
          : user?.profile?.name}
      </h1>

      {user?.type !== "corporate" && (
        <h2 className={styles.profile_name}>{user?.profile?.name}</h2>
      )}
    </div>
  );
};
