import styles from "./Header.module.scss";

import { Icon } from "../../../../../../components/icon/Icon";

export const Header = ({ post }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_icon}>
        <Icon src={post?.icon} />
      </div>

      <div className={styles.header_wrap}>
        <h1 className={styles.header_ttl}>
          {post?.profile?.person ? post.profile.person : post.profile.nickName}
        </h1>
        <h2 className={styles.header_tag}>
          {post?.profile?.name ? post.profile.name : post.profile.position}
        </h2>
      </div>
    </div>
  );
};
