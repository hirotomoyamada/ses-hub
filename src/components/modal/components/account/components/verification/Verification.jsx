import styles from "./Verification.module.scss";

export const Verification = () => {
  return (
    <div className={styles.verification}>
      <p className={styles.verification_ttl}>アカウントを削除</p>
      <p className={styles.verification_desc}>
        アカウントを削除すると、これまでのデータはすべて削除され
        <br />
        アカウント同士のリンクも解除されます
        <br />
        <br />
        また、復元することもできませんのでご注意ください
        <br />
      </p>

      <button type="button" className={styles.verification_btn}>
        　アカウント削除
      </button>
    </div>
  );
};
