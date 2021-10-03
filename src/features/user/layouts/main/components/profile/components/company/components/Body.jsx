import styles from "../../../Profile.module.scss";

export const Body = ({ user }) => {
  return user?.profile?.body ? (
    <p className={styles.profile_body}>{user?.profile?.body}</p>
  ) : (
    <></>
  );
};
