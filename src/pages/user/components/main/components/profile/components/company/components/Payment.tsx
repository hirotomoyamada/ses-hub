import React from "react";
import styles from "../Company.module.scss";

import { Company } from "types/post";
import { User } from "types/user";

interface PropType {
  user: Company | User;
}

export const Payment: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.profile_wrap}>
      <div
        className={`${styles.profile_payment} ${
          user?.payment?.status === "active"
            ? styles.profile_payment_active
            : user?.payment?.status === "trialing" &&
              styles.profile_payment_trialing
        }`}
      >
        {user?.payment?.status === "active"
          ? "レギュラー"
          : user?.payment?.status === "trialing"
          ? "フリートライアル"
          : "リミテッド"}
      </div>

      {user?.payment?.status !== "canceled" &&
        (user as User)?.payment?.option?.freelanceDirect && (
          <div
            className={`${styles.profile_payment} ${styles.profile_payment_option}`}
          >
            フリーランスダイレクト
          </div>
        )}
    </div>
  );
};
