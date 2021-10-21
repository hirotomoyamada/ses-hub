import { Menu } from "../../../../../../../../post/menu/Menu";
import styles from "../Person.module.scss";

export const Head = ({ user, currentUser }) => {
  return (
    <div className={styles.profile_wrap}>
      <h1 className={styles.profile_name}>{user?.profile?.nickName}</h1>

      <div className={styles.profile_position}>{user?.profile?.position}</div>

      <Menu index="persons" post={user} user={currentUser} person />
    </div>
  );
};
