import React from "react";
import styles from "../Company.module.scss";

import { Company } from "types/post";
import { User } from "types/user";

interface PropType {
  user: Company | User;
}

export const Payment: React.FC<PropType> = ({ user }) => {
  const status = "payment" in user ? user.payment.status : user.status;

  return (
    <div className={styles.profile_wrap}>
      <div
        className={`${styles.profile_payment} ${
          status === "active"
            ? styles.profile_payment_active
            : status === "trialing" && styles.profile_payment_trialing
        }`}
      >
        {status === "active"
          ? "レギュラー"
          : status === "trialing"
          ? "フリートライアル"
          : "リミテッド"}
      </div>

      {status !== "canceled" &&
        "payment" in user &&
        user?.payment?.option?.freelanceDirect && (
          <div
            className={`${styles.profile_payment} ${styles.profile_payment_option}`}
          >
            フリーランスダイレクト
          </div>
        )}
    </div>
  );
};
