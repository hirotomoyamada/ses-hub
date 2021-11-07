import styles from "../Company.module.scss";

export const Payment = ({ user }) => {
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
          ? "レギュラー(フリートライアル)"
          : "リミテッド"}
      </div>

      {user?.payment?.option?.freelanceDirect && (
        <div
          className={`${styles.profile_payment} ${styles.profile_payment_option}`}
        >
          フリーランスダイレクト
        </div>
      )}
    </div>
  );
};
