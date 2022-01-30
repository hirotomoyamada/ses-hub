import styles from "./Main.module.scss";

export const Main = ({ user, handleApplication }) => {
  return (
    <div className={styles.main}>
      <p
        className={`${styles.main_ttl} ${
          (user?.type !== "individual" ||
            user?.application ||
            user?.payment?.price ||
            user?.payment?.children?.length) &&
          styles.main_ttl_error
        }`}
      >
        {user?.type === "individual" &&
        !user?.application &&
        !user?.payment?.price &&
        !user?.payment?.children?.length
          ? "法人アカウントに変更する"
          : "法人アカウントに変更できません"}
      </p>

      <p className={styles.main_desc}>
        法人アカウントに変更するには、申請を行う必要があります
        <br />
        <br />
        尚、申請が承認されるまで翌３営業日程掛かる場合がございます
      </p>

      <button
        className={`${styles.main_btn} ${
          (user?.type !== "individual" ||
            user?.application ||
            user?.payment?.price ||
            user?.payment?.children?.length) &&
          styles.main_btn_disable
        }`}
        type="button"
        onClick={handleApplication}
      >
        {user?.type !== "individual"
          ? "すでに法人アカウントです"
          : user?.application
          ? "申請済みです ※承認されるまでお待ちください"
          : user?.payment?.price
          ? "現在のプランが満了するまで変更できません"
          : user?.payment?.children?.length
          ? "グループアカウントを保有しているため変更できません"
          : "申請する"}
      </button>
    </div>
  );
};
