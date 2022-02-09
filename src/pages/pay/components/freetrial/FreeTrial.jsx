import styles from "./FreeTrial.module.scss";

export const FreeTrial = ({ user }) => {
  return user?.payment?.trial && user?.type === "individual" ? (
    <div className={styles.free}>
      <p className={styles.free_desc}>\ キャンペーン中 /</p>
      <h1 className={styles.free_ttl}>フリートライアル</h1>
      <img
        src={`${process.env.PUBLIC_URL}/img/promotion/lets.svg`}
        alt=""
        className={styles.free_bg}
      />
    </div>
  ) : (
    <></>
  );
};
