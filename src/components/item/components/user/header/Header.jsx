import styles from "./Header.module.scss";

import { Icon } from "../../../../icon/Icon";

export const Header = ({ post }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_icon}>
        <Icon src={post?.icon} />
      </div>

      <div className={styles.header_container}>
        <div className={styles.header_wrap}>
          <h1 className={styles.header_ttl}>
            {post?.profile?.person
              ? post?.profile?.person
              : post?.profile?.nickName}
          </h1>

          {post?.status && (
            <span
              className={`${styles.header_category} ${
                post?.status === "active"
                  ? styles.header_category_active
                  : post?.status === "trialing" &&
                    styles.header_category_trialing
              }`}
            >
              {post?.status === "active"
                ? "レギュラー"
                : post?.status === "trialing"
                ? "フリートライアル"
                : "リミテッド"}
            </span>
          )}

          {post?.profile?.state && (
            <span
              className={`${styles.header_category} ${
                (post?.profile?.state === "確定" ||
                  post?.profile?.state === "商談中" ||
                  post?.profile?.state === "情報収集中") &&
                styles.header_category_disable
              } ${
                post?.profile?.state === "至急" && styles.header_category_hurry
              }`}
            >
              {post?.profile?.state}
            </span>
          )}
        </div>

        {(post?.profile?.name || post?.profile?.position) && (
          <h2 className={styles.header_tag}>
            {post?.profile?.name
              ? post?.profile?.name
              : post?.profile?.position}
          </h2>
        )}
      </div>
    </div>
  );
};
