import styles from "../Main.module.scss";
import { Cover } from "../../../../../components/cover/Cover";
import { Icon } from "../../../../../components/icon/Icon";

export const Header = ({ user }) => {
  return (
    <div className={styles.main_header}>
      <Cover src={user?.cover} />

      <div className={styles.main_header_icon}>
        <Icon src={user?.icon} />
      </div>
    </div>
  );
};
